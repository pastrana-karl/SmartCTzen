const SuperAdmin = require('../models/superAdminModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });
// const app = require("./app");
//Sendgrid key

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key: process.env.KEY
    }
}))

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
    const superadmin = await SuperAdmin.findOne({ email: req.body.email }).collation({locale: "en", strength: 2});

    if(!superadmin)
    {
        return res.status(400).json("User not found, wrong email!!");
    }
    
    const validated = await bcrypt.compare(req.body.password, superadmin.password);

    if(!validated)
    {
        return res.status(400).json("Wrong Password!!");
    }

    createSendToken(superadmin, 201, res);

    // const { password, ...others } = superadmin._doc;
    // res.status(200).json(others);
});


exports.UpdateSuperAdmin = catchAsync(async (req, res) => {
    const token = req.body.token;

    if(req.body.newPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.newPassword, salt);

        if(req.body.userId === req.params.id){
            try{
                const updatedUser = await SuperAdmin.findByIdAndUpdate(req.params.id,{
                    $set: { "password": hashedPass }
                },
                { new:true }
                );

                const { password, ...others } = updatedUser._doc;
                res.status(200).json({others, token});
            }catch(err){
                res.status(500).json(err);
            }
        }
    }

    if(req.body.newEmail) {
        if(req.body.userId === req.params.id){
            try{
                const updatedUser = await SuperAdmin.findByIdAndUpdate(req.params.id,{
                    $set: { "username": req.body.username, "email": req.body.newEmail }
                },
                { new:true }
                );
    
                const { password, ...others } = updatedUser._doc;
                res.status(200).json({others, token});
            }catch(err){
                res.status(500).json(err);
            }
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

exports.PassWordCompare = catchAsync(async (req, res, next) => {
    const superadmin = await SuperAdmin.findById(req.body.userId);

    const validated = await bcrypt.compare(req.body.oldPassword, superadmin.password);

    if(!validated)
    {
        return res.status(400).json("Your Old Password is Wrong!!");
    }
    
    res.status(200).json("Correct Password!");
});

exports.PasswordChangeReq = catchAsync(async (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if(err){
            console.log(err)
        }

        const token = buffer.toString("hex")
        SuperAdmin.findOne({email:req.body.email})
        .then(sa => {
            if(!sa){
                return res.status(422).json({error: "User don't exist"})
            }

            sa.resetToken = token
            sa.expireToken = Date.now() + 3600000
            sa.save().then((result) => {
                transporter.sendMail({
                    to:sa.email,
                    from:"smartct.management@gmail.com",
                    subject:"Password Reset",
                    html: `
                    <html lang="en">
                    <head>
                        <meta charset="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                    </head>
                    <body style = "
                        padding: 50px;
                        margin: 0;
                    ">
                        <div style = "
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        ">
                            <div style = "
                                box-sizing: border-box;
                                padding: 50px;
                                background: #F0F0F3;
                                box-shadow: 10px 10px 30px #aeaec066, -10px -10px 30px #FFFFFF;
                                border-radius: 20px;
                            ">
                                <h3 style = "
                                    font-weight: bold;
                                    color: #fe5138;
                                    text-align: center;
                                ">
                                    You requested for password reset
                                </h3>

                                <p style = "
                                    font-weight: bold;
                                    text-align: center;
                                    color: black;
                                ">
                                    click in this <a href ="http://localhost:3000/superAdmin-changePassword/${token}">link</a> to reset password
                                </p>
                            </div>
                        </div>
                        
                        <p style = "
                            font-weight: bold;
                            color: black;
                        ">
                            <br></br><br></br>
                            From: SmartCT Community
                            <br></br>
                            "Be a Smart Citizen!"
                        </p>
                    </body>
                    </html>
                    `
                })

                res.json({message: "Check your email!"})
            })
        })
    })
});

exports.PasswordChange = catchAsync(async (req, res, next) => {
    const newPassword = req.body.newPassword
    const sentToken = req.body.token

    SuperAdmin.findOne({resetToken:sentToken, expireToken:{$gt:Date.now()}})
    .then(async (SA) => {
        if(!SA){
            return res.status(422).json({error: "Try again sessions expired!!"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(newPassword, salt);

        SA.password = hashedPass
        SA.resetToken = undefined
        SA.expireToken = undefined

        SA.save().then((savedSA) => {
            res.status(200).json(SA)
        })
    }).catch(err => {
        console.log(err)
        res.status(400).json(err)
    })
});