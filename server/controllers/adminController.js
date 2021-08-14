const Admin = require('../models/adminModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");

//sendgrid api-key: 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

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))

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
    res.status(200).json(admin)
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
                    from:"sct.zen.management@gmail.com",
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