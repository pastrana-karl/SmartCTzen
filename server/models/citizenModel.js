const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const citizenSchema = new mongoose.Schema({
    lastname:{
        type: String,
        required: [true, "This field is required"]
    },

    firstname:{
        type: String,
        required: [true, "This field is required"]
    },

    middlename:{
        type: String,
    },

    suffix:{
        type: String,
    },

    sex:{
        type: String,
        required: [true, "This field is required"]
    },

    birthdate:{
        type: String,
        required: [true, "This field is required"]
    },

    fathername:{
        type: String,
    },

    mothername:{
        type: String,
    },

    street:{
        type: String,
    },

    barangay:{
        type: String,
    },

    city:{
        type: String,
    },

    province:{
        type: String,
    },

    zipcode:{
        type: String,
    },

    region:{
        type: String,
    },

    validIDPic:[{
        type:String,
        default:"",
    }],
    
    residencyPic:[{
        type:String,
        default:"",
    }],
    
    birthCertPic:[{
        type:String,
        default:"",
    }],

    email:{
        type: String,
        unique: true,
        required: [true, "This field is required"]
    },

    password:{
        type: String,
    },

    // passwordConfirm: {
    //     type: String,
    //     required: [true, "This field is required"],
    //     validate: {
    //         validator: function(el) {
    //             return el === this.password;
    //         },
    //         message: "Passwords are not the same"
    //     }
    // },
    // passwordChangedAt: Date,

    resetToken:{
        type: String,
    },

    expireToken:{
        type: Date,
    },
}, 

{ timestamps: true }

);

//insert slug

// citizenSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();

//     this.password = await bcrypt.hash(this.password, 12);
//     this.passwordConfirm = undefined;
//     next();
// });

// citizenSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
//     return await bcrypt.compare(candidatePassword, userPassword);
// };

// citizenSchema.methods.changePasswordAfter = function(JWTTimestamp) {
//     if (this.passwordChangedAt) {
//         const changedTimestamp = parseInt(this.passwordChangedAt.getTime());

//         console.log(changedTimestamp, JWTTimestamp);
//         return JWTTimestamp < changedTimestamp;
//     }

//     return false;
// }

// module.exports = mongoose.model("Citizen", citizenSchema);

const Citizen = mongoose.model("Citizen", citizenSchema);
module.exports = Citizen;
