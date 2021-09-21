const jwt = require("jsonwebtoken");
const { promisify } = require("util"); //built-in module

const Citizen = require("../models/citizenModel");
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require("bcrypt");

/**
 * 
 * The catchAsync() function will be our error handler so you don't
 * have to use the try-catch block
 * 
 * */

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        secure: false,
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove password from the output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

// Register DO NOTE ERASE
// exports.registerCitizen = catchAsync(async (req, res, next) => {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(req.body.password, salt);
//     const newCitizen = await Citizen.create({
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         middlename: req.body.middlename,
//         suffix: req.body.suffix,
//         sex: req.body.sex,
//         birthdate: req.body.birthdate,
//         fathername: req.body.fathername,
//         mothername: req.body.mothername,
//         street: req.body.street,
//         barangay: req.body.barangay,
//         city: req.body.city,
//         province: req.body.province,
//         zipcode: req.body.zipcode,
//         region: req.body.region,
//         validIDPic: req.body.validIDPic,
//         residencyPic: req.body.residencyPic,
//         birthCertPic: req.body.birthCertPic,
//         email: req.body.email,
//         password: req.body.password
//         //passwordConfirm: req.body.passwordConfirm
//     });

//     // Remove password from the output
//     // newCitizen.password = undefined;

//     // res.status(201).json({
//     //     status: 'success',
//     //     token,
//     //     data: {
//     //         newCitizen
//     //     }
//     // });

//     const citizen = await newCitizen.save();
//     res.status(200).json(citizen);
//     // createSendToken(newCitizen, 201, res);
// });

exports.getCitizen = catchAsync(async (req, res, next) => {
    const citizen = await Citizen.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        citizen

    });
});

exports.registerCitizen = catchAsync(async (req, res, next) => {
    const newCitizen = await Citizen.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        middlename: req.body.middlename,
        suffix: req.body.suffix,
        sex: req.body.sex,
        birthdate: req.body.birthdate,
        fathername: req.body.fathername,
        mothername: req.body.mothername,
        street: req.body.street,
        barangay: req.body.barangay,
        city: req.body.city,
        province: req.body.province,
        zipcode: req.body.zipcode,
        region: req.body.region,
        validIDPic: req.body.validIDPic,
        residencyPic: req.body.residencyPic,
        birthCertPic: req.body.birthCertPic,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    createSendToken(newCitizen, 201, res);
});

exports.loginCitizen = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //1) Check if there is email and password
    if(!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    //2 Check if user exists && password is valid
    const citizenUser = await Citizen.findOne({ email }).select('+password');

    if (!citizenUser || !(await citizenUser.correctPassword(password, citizenUser.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }

    //3) Check if everything is ok, send token to client
    createSendToken(citizenUser, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    //1) Getting token and check if it's there
    let token;

    const headerAuth = req.headers.authorization;
    if (headerAuth && headerAuth.statsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    console.log(token);

    if (!token) {
        return next(new AppError('Please login!', 401));
    }

    //2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    //3) Check if user still exists
    const freshCitizen = await Citizen.findById(decoded.id);
    if (!freshCitizen) {
        return next(new AppError('User no longer exists', 401));
    }

    //4) Check if user changed password after the JWT was issued
    if (freshCitizen.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed password! Please login again', 401));
    }

    //GRANT ACCESS TO PROTECTED ROUTE
    req.user = freshCitizen;
    next();
});

//Login Backup DO NOT ERASE
// exports.loginCitizen = catchAsync(async (req, res, next) => {
//     const citizen = await Citizen.findOne({ email: req.body.email });

//     if(!citizen)
//     {
//         return res.status(400).json("Wrong Credentials!!");
//     }

//     const validated = await bcrypt.compare(req.body.password, citizen.password);

//     if(!validated)
//     {
//         return res.status(400).json("Wrong Credentials!!");
//     }

//     const { password, ...others } = citizen._doc;
//     console.log()
//     res.status(200).json(others);
// });

