const jwt = require("jsonwebtoken");
const { promisify } = require("util"); //built-in module
const Admin = require('../models/adminModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const diffHistory = require('mongoose-audit-trail');
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });
const app = require("./app");
//Sendgrid key

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key: process.env.KEY
    }
}))

exports.getMe = catchAsync(async (req, res, next) => {
    req.params.id = req.user.id;
    next();
});

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        secure: false,
        httpOnly : true
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove password from the output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: { user }
    });
};

// Register BACKUP DO NOT ERASE
exports.registerAdmin = catchAsync(async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newAdmin = new Admin({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
        location: req.body.location,
        onlineStatus: false,
    });

    transporter.sendMail({
        to:newAdmin.email,
        from:"smartct.management@gmail.com",
        subject:"Administrator Account Created",
        html:`
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
                        Welcome!
                    </h3>

                    <p style = "
                        font-weight: bold;
                        text-align: center;
                        color: black;
                    ">
                        Your Administrator account is created.
                        <br></br><br></br>
                        Your default password is:<br></br>
                        Password: $m4rtCTz3n
                        <br></br><br></br>
                        NOTE: CHANGE YOUR PASSWORD AFTER FIRST LOGIN.
                    </p>
                </div>
            </div>
            
            <p style = "
                font-weight: bold;
                color: black;
            ">
                <br></br><br></br>
                From: SmartCTzen Community
                <br></br>
                "Be a Smart Citizen!"
            </p>
        </body>
        </html>
        `
    })

    const admin = await newAdmin.save();
    res.status(200).json(admin)
});

// exports.registerAdmin = catchAsync(async (req, res, next) => {
//     const newAdmin = await Admin.create({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//         location: req.body.location,
//         onlineStatus: false
//     });

//     createSendToken(newAdmin, 201, res);
// });

exports.loginAdmin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //1) Check if there is email and password
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    //2) Check if user exists && password is valid
    const adminUser = await Admin.findOne({ email }).select('+password');

    if (!adminUser || !(await adminUser.correctPassword(password, adminUser.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }

    //3) Check of everything ok, send token to client
    const adminStatus = await Admin.findOne({ email });
    await Admin.findByIdAndUpdate(adminStatus._id, {
        $set: { 'onlineStatus': true }
    });
    createSendToken(adminUser, 201, res);
});

exports.AdminLogout = catchAsync(async (req, res, next) => {
    try {
        await Admin.findByIdAndUpdate(req.body.adminID, {
            $set: { 'onlineStatus': false }
        });
    
        res.status(200).json('Admin logged out . . .');
    } catch (err) {
        res.status(500).json(err)
    }
});

exports.updateAdmin = catchAsync(async (req, res, next) => {
    const token = req.body.token;
    
    if (req.body.profilePic) {
        const user = await Admin.findByIdAndUpdate(req.params.id, {
            $set: { "profilePic": req.body.profilePic }
        },
        { new: true });

        const updatedProfile = new diffCollection({
            collectionName: 'Admin',
            userType: user.userType,
            user: user.username,
            reason: 'Updated Profile'
        });

        await updatedProfile.save();

        res.status(200).json({data: { user }, token});
    }

    if (req.body.newPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.newPassword, salt);
    
        if (req.body.userId === req.params.id) {
            const updatedUser = await Admin.findByIdAndUpdate(req.params.id, {
                $set: { "password": hashedPass }
            },
            { new: true }
            );

            const updatedPassword = new diffCollection({
                collectionName: 'Admin',
                userType: updatedUser.userType,
                user: updatedUser.username,
                reason: 'Updated Password'
            });

            await updatedPassword.save();

            const { password, ...user } = updatedUser._doc;
            res.status(200).json({ data: { user }, token });
        }
    }
});

exports.getAdmin = catchAsync(async (req, res, next) => {
    const admin = await Admin.findById(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            admin
        }
    });
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
                                    click in this <a href ="http://localhost:3000/admin-change/${token}">link</a> to reset password
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
}

//CHANGE PASSWORD

exports.changeAdminPassword = (req, res, next) => {
    const newPassword = req.body.newPassword
    const sentToken = req.body.token

    Admin.findOne({resetToken:sentToken, expireToken:{$gt:Date.now()}})
    .then(async (Admin) => {
        if(!Admin){
            return res.status(422).json({error: "Try again sessions expired!!"})
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPass = await bcrypt.hash(newPassword, salt);

        Admin.password = hashedPass
        Admin.resetToken = undefined
        Admin.expireToken = undefined

        Admin.save().then((savedUser) => {
            res.status(200).json(Admin)
        })
    }).catch(err => {
        console.log(err)
    });
};

//Compare Password
exports.PassWordCompare = catchAsync(async (req, res, next) => {
    const administrator = await Admin.findById(req.body.userId);

    const validated = await bcrypt.compare(req.body.oldPassword, administrator.password);

    if(!validated)
    {
        return res.status(400).json("Your Old Password is Wrong!!");
    }
    
    res.status(200).json("Correct Password!");
});