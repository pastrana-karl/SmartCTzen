const jwt = require("jsonwebtoken");
const { promisify } = require("util"); //built-in module
const Admin = require('../models/adminModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");

//Sendgrid key

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

//Register BACKUP DO NOT ERASE
// exports.registerAdmin = catchAsync(async (req, res, next) => {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(req.body.password, salt);
//     const newAdmin = new Admin({
//         username: req.body.username,
//         email: req.body.email,
//         password: hashedPass,
//     });

//     const admin = await newAdmin.save();
//     res.status(200).json(admin)
// });

exports.registerAdmin = catchAsync(async (req, res, next) => {
    const newAdmin = await Admin.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newAdmin._id);
    
    res.status(201).json({
        status: "success",
        token,
        data: {
            newAdmin
        }
    });
});

exports.loginAdmin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //1) Check if there is email and password
    if (!emal || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    //2) Check if user exists && password is valid
    const adminUser = await Admin.findOne({ email }).select('+password');

    if (!adminUser || !(await adminUser.correctPassword(password, adminUser.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }

    //3) Check of everything ok, send token to client
    const token = signToken(adminUser._id);
    res.status(200).json({
        status: 'success',
        token
    });
});

exports.protectAdmin = catchAsync(async (req, res, next) => {
    //1) Getting token and check if it's there
    let token;

    const headerAuth = req.header.authorization;
    if (headerAuth && headerAuth.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError("Please login!", 401));
    }

    //2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    //3) Check if user still exists
    const freshAdmin = await Admin.findById(decoded.id);
    if (!freshAdmin) {
        return next(new AppError("User no longer exists", 401));
    }

    //4) Check if user changed password after the JWT was issued
    if (freshAdmin.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed password! Please login again', 401));
    }

    //GRANT ACCESS TO PROTECTED ROUTE
    req.user = freshAdmin;
    next();

})

//Login BACKUP DO NOT ERASE
// exports.loginAdmin = catchAsync(async (req, res, next) => {
//     const admin = await Admin.findOne({ username: req.body.username });

//     if(!admin)
//     {
//         return res.status(400).json("Wrong Credentials!!");
//     }

//     const validated = await bcrypt.compare(req.body.password, admin.password);

//     if(!validated)
//     {
//         return res.status(400).json("Wrong Credentials!!");
//     }

//     const { password, ...others } = admin._doc;
//     res.status(200).json(others);
// });

//FORGOT PASSWORD

exports.forgotAdmin = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if(err){
            console.log(err)
        }

        const token = buffer.toString("hex")
        Admin.findOne({email:req.body.email})
        .then(admin => {
            if(!admin){
                return res.status(422).json({error: "User don't exist"})
            }

            admin.resetToken = token
            admin.expireToken = Date.now() + 3600000
            admin.save().then((result) => {
                transporter.sendMail({
                    to:admin.email,
                    from:"smartct.management@gmail.com",
                    subject:"Password Reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href ="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                    `
                })

                res.json({message: "Check your email!"})
            })
        })
    })
}

//CHANGE PASSWORD

exports.changeAdminPassword = (req, res, next) => {
    const newPassword = req.body.password
    const sentToken = req.body.token

    Admin.findOne({resetToken:sentToken, expireToken:{$gt:Date.now()}})
    .then(async (Admin) => {
        if(!Admin){
            return res.status(422).json({error: "Try again sessions expired!!"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(newPassword, salt);

        Admin.password = hashedPass
        Admin.resetToken = undefined
        Admin.expireToken = undefined

        Admin.save().then((savedUser) => {
            res.status(200).json(Admin)
        })
    }).catch(err => {
        console.log(err)
    })
}