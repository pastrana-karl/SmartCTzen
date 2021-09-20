const SuperAdmin = require('../models/superAdminModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    const { password, ...others } = user._doc;
    res.status(statusCode).json({others, token});
};

exports.registerSuperAdmin = catchAsync(async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newSuperAdmin = new SuperAdmin({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
    });

    const superadmin = await newSuperAdmin.save();

    res.status(200).json(superadmin);
});

exports.loginSuperAdmin = catchAsync(async (req, res, next) => {
    const superadmin = await SuperAdmin.findOne({ email: req.body.email });

    if(!superadmin)
    {
        return res.status(400).json("Wrong Credentials!!");
    }
    
    const validated = await bcrypt.compare(req.body.password, superadmin.password);

    if(!validated)
    {
        return res.status(400).json("Wrong Credentials!!");
    }

    createSendToken(superadmin, 201, res);

    // const { password, ...others } = superadmin._doc;
    // res.status(200).json(others);
});


exports.UpdateSuperAdmin = catchAsync(async (req, res) => {
    const superadmin = await SuperAdmin.findById(req.params.id);
    const token = req.body.token;

    if(req.body.userId === req.params.id){

        if(req.body.password === "") {
            req.body.password = superadmin.password;
        } else {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        try{
            const updatedUser = await SuperAdmin.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            },
            { new:true }
            );

            const { password, ...others } = updatedUser._doc;
            res.status(200).json({others, token});
        }catch(err){
            res.status(500).json(err);
        }
    }
});


exports.GetSpecificSuperAdmin = catchAsync(async (req, res) => {
    try{
        const specSAdmin = await SuperAdmin.findById(req.params.id);

        const { password, ...others } = specSAdmin._doc;
        res.status(200).json(others);
    }catch(err){
         res.status(500).json(err);
    }
});