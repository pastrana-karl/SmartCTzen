const jwt = require("jsonwebtoken");
const { promisify } = require("util"); //built-in module
const diffCollection = require("../models/diffCollectionModel");
const Citizen = require("../models/citizenModel");
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const catchAsync = require('../utils/catchAsync');
const crypto = require("crypto");
const bcrypt = require("bcrypt");


//Sendgrid key

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))

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
exports.registerCitizen = catchAsync(async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
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
        status: req.body.status,
        password: hashedPass
    });

    transporter.sendMail({
        to:newCitizen.email,
        from:"smartct.management@gmail.com",
        subject:"Registration Verification Ongoing",
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
                        Thank you!
                    </h3>

                    <p style = "
                        font-weight: bold;
                        text-align: center;
                        color: black;
                    ">
                        Your registration is recieved.<br></br>
                        Please wait for confirmation to access your account.
                    </p>
                </div>
            </div>
            
            <p style = "
                font-weight: bold;
                color: black;
            ">
                <br></br><br></br>
                From: Your SmartCTzen Administrator
                <br></br>
                "Be a Smart Citizen!"
            </p>
        </body>
        </html>
        `
    })

    const citizen = await newCitizen.save();
    res.status(200).json(citizen);
});

exports.getCitizen = catchAsync(async (req, res, next) => {
    const citizen = await Citizen.findById(req.params.id);

    res.status(200).json(citizen);
});

// exports.registerCitizen = catchAsync(async (req, res, next) => {
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
//         password: req.body.password,
//         status: req.body.status
//         // passwordConfirm: req.body.passwordConfirm
//     });


//     createSendToken(newCitizen, 201, res);
// });

exports.loginCitizen = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //1) Check if there is email and password
    if(!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    //2 Check if user exists && password is valid
    const citizenUser = await Citizen.findOne({ email }).select('+password');
    // if(citizenUser.status === 'false') {

    // } else {
    if(citizenUser.status === 'false') {
        return next(new AppError("This account is not yet verefied by the administrator . . .", 403));
    } else {
        if (!citizenUser || !(await citizenUser.correctPassword(password, citizenUser.password))) {
            return next(new AppError("Incorrect email or password", 401));
        }
    
        //3) Check if everything is ok, send token to client
        createSendToken(citizenUser, 201, res);
    }
});

// exports.protect = catchAsync(async (req, res, next) => {
//     //1) Getting token and check if it's there
//     let token;

//     const headerAuth = req.headers.authorization;
//     if (headerAuth && headerAuth.statsWith('Bearer')) {
//         token = req.headers.authorization.split(' ')[1];
//     }

//     console.log(token);

//     if (!token) {
//         return next(new AppError('Please login!', 401));
//     }

//     //2) Verification token
//     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//     console.log(decoded);

//     //3) Check if user still exists
//     const freshCitizen = await Citizen.findById(decoded.id);
//     if (!freshCitizen) {
//         return next(new AppError('User no longer exists', 401));
//     }

//     //4) Check if user changed password after the JWT was issued
//     if (freshCitizen.changedPasswordAfter(decoded.iat)) {
//         return next(new AppError('User recently changed password! Please login again', 401));
//     }

//     //GRANT ACCESS TO PROTECTED ROUTE
//     req.user = freshCitizen;
//     next();
// });

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

//UPDATE CITIZEN
exports.UpdateCitizen = catchAsync(async (req, res, next) => {
    const token = req.body.token;

    if(req.body.profilePic) {
        try{
            const user = await Citizen.findByIdAndUpdate(req.params.id,{
                $set: { "profilePic": req.body.profilePic }
            },
            { new:true }
            );

            const updatedProfile = new diffCollection({
                collectionName: 'Citizen',
                userType: user.userType,
                user: user.firstname + " " + user.lastname,
                reason: 'Updated Profile',
            });
            
            await updatedProfile.save();

            res.status(200).json({data: { user }, token});
        }catch(err){
            res.status(500).json(err);
        }
    }

    if(req.body.newPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.newPassword, salt);

        if(req.body.userId === req.params.id){
            try{
                const updatedUser = await Citizen.findByIdAndUpdate(req.params.id,{
                    $set: { "password": hashedPass }
                },
                { new:true }
                );

                const updatedPassword = new diffCollection({
                    collectionName: 'Citizen',
                    userType: updatedUser.userType,
                    user: updatedUser.firstname + " " + updatedUser.lastname,
                    reason: 'Updated Password',
                });
                
                await updatedPassword.save();

                const { password, ...user } = updatedUser._doc;
                res.status(200).json({data: { user }, token});
            }catch(err){
                res.status(500).json(err);
            }
        }
    }
});

//GET ALL APPLICANTS
exports.applicants = catchAsync(async (req, res, next) => {
    const applicantStatus = req.query.status;

    try{
        let citizenUser;

        if(applicantStatus) {
            citizenUser = await Citizen.find({ status:applicantStatus }).collation({locale: "en", strength: 2})
        } else {
            res.status(404).json("There are no current applicants...");
        }

        res.status(200).json(citizenUser);
    }catch(err){
         res.status(500).json(err);
    }
});

//ACCEPT APPLICANTS
exports.acceptApplicant = catchAsync(async (req, res, next) => {
    try{
        const acceptApplicant = await Citizen.findByIdAndUpdate(req.params.id,{
            $set: { "status": true }
        });

        const adminAcceptApplicant = new diffCollection({
            collectionName: 'Admin',
            userType: req.body.usertype,
            user: req.body.username,
            reason: 'Accepted Applicant ' + acceptApplicant.firstname + ' ' + acceptApplicant.lastname,
        });
        
        await adminAcceptApplicant.save();

        transporter.sendMail({
            to:acceptApplicant.email,
            from:"smartct.management@gmail.com",
            subject:"Registration Confirmation",
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
                            Your registration is Approved.
                        </p>
                    </div>
                </div>
                
                <p style = "
                    font-weight: bold;
                    color: black;
                ">
                    <br></br><br></br>
                    From: Your SmartCTzen Administrator
                    <br></br>
                    "Be a Smart Citizen!"
                </p>
            </body>
            </html>
            `
        })

        const { password, ...others } = acceptApplicant._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }

});

//REJECT APPLICANTS
exports.rejectApplicant = catchAsync(async (req, res, next) => {
    try {
        const rejectApplicant = await Citizen.findById(req.params.id);

        const adminRejectApplicant = new diffCollection({
            collectionName: 'Admin',
            userType: req.body.usertype,
            user: req.body.username,
            reason: 'Rejected Applicant ' + rejectApplicant.firstname + ' ' + rejectApplicant.lastname,
        });
        
        await adminRejectApplicant.save();

        await rejectApplicant.delete();

        transporter.sendMail({
            to:rejectApplicant.email,
            from:"smartct.management@gmail.com",
            subject:"Registration Rejected",
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
                            Sorry . . .
                        </h3>

                        <p style = "
                            font-weight: bold;
                            text-align: center;
                            color: black;
                        ">
                            Your registration is rejected.
                        </p>
                    </div>
                </div>
                
                <p style = "
                    font-weight: bold;
                    color: black;
                ">
                    <br></br><br></br>
                    From: Your SmartCTzen Administrator
                    <br></br>
                    "Be a Smart Citizen!"
                </p>
            </body>
            </html>
            `
        })

        res.status(200).json("Citizen has been rejected...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//Compare Password
exports.PassWordCompare = catchAsync(async (req, res, next) => {
    const citizen = await Citizen.findById(req.body.userId);

    const validated = await bcrypt.compare(req.body.oldPassword, citizen.password);

    if(!validated)
    {
        return res.status(400).json("Your Old Password is Wrong!!");
    }
    
    res.status(200).json("Correct Password!");
});

//Change Password Request
exports.PasswordChangeReq = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if(err){
            console.log(err)
        }


        const email = req.body.email;

        const token = buffer.toString("hex")
        Citizen.findOne({ email })
        .then(citizen => {
            if(!citizen){
                return res.status(422).json({error: "User don't exist"})
            }

            citizen.resetToken = token
            citizen.expireToken = Date.now() + 3600000
            citizen.save().then((result) => {
                transporter.sendMail({
                    to:citizen.email,
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
                                    click in this <a href ="http://localhost:3000/change-password/${token}">link</a> to reset password
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

//Change Password
exports.ChangePassword = (req, res, next) => {
    const newPassword = req.body.newPassword
    const sentToken = req.body.token

    Citizen.findOne({resetToken:sentToken, expireToken:{$gt:Date.now()}})
    .then(async (citizen) => {
        if(!citizen){
            return res.status(422).json({error: "Try again sessions expired!!"})
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPass = await bcrypt.hash(newPassword, salt);

        citizen.password = hashedPass
        citizen.resetToken = undefined
        citizen.expireToken = undefined

        citizen.save().then((savedUser) => {
            res.status(200).json(citizen)
        })
    }).catch(err => {
        console.log(err)
    })
}