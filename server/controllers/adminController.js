const Admin = require('../models/adminModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require("bcrypt");

//Register
exports.registerAdmin = catchAsync(async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newAdmin = new Admin({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
    });

    const admin = await newAdmin.save();
});

//Login
exports.loginAdmin = catchAsync(async (req, res, next) => {
    const admin = await Admin.findOne({ username: req.body.username });

    if(!admin)
    {
        return res.status(400).json("Wrong Credentials!!");
    }

    const validated = await bcrypt.compare(req.body.password, admin.password);

    if(!validated)
    {
        return res.status(400).json("Wrong Credentials!!");
    }

    const { password, ...others } = admin._doc;
    res.status(200).json(others);
});