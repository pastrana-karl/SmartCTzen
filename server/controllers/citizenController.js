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

//Register
exports.registerCitizen = catchAsync(async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newCitizen = new Citizen({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        middlename: req.body.middlename,
        suffix: req.body.suffix,
        sex: req.body.sex,
        fathername: req.body.fathername,
        mothername: req.body.mothername,
        street: req.body.street,
        barangay: req.body.barangay,
        city: req.body.city,
        province: req.body.province,
        zipcode: req.body.zipcode,
        region: req.body.region,
        email: req.body.email,
        password: hashedPass,
    })

    const citizen = await newCitizen.save();

    res.status(200).json({
        status: "Success",
        data: {
            citizen
        }
    });
});

//Login
exports.loginCitizen = catchAsync(async (req, res, next) => {
    const citizen = await Citizen.findOne({ email: req.body.email });

    if(!citizen)
    {
        return res.status(400).json("Wrong Credentials!!");
    }

    const validated = await bcrypt.compare(req.body.password, citizen.password);

    if(!validated)
    {
        return res.status(400).json("Wrong Credentials!!");
    }

    const { password, ...others } = citizen._doc;
    res.status(200).json(others);
});