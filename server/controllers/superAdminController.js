const SuperAdmin = require('../models/superAdminModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require("bcrypt");

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

    const { password, ...others } = superadmin._doc;
    res.status(200).json(others);
});


exports.UpdateSuperAdmin = catchAsync(async (req, res) => {
    const superadmin = await SuperAdmin.findById(req.params.id);

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

            res.status(200).json(updatedUser);
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