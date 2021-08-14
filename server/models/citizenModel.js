const mongoose = require("mongoose");

const citizenSchema = new mongoose.Schema({
    lastname:{
        type: String,
    },

    firstname:{
        type: String,
    },

    middlename:{
        type: String,
    },

    suffix:{
        type: String,
    },

    sex:{
        type: String,
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

    validIDPic:{
        type: String,
        default: "",
    },
    
    residencyPic:{
        type: String,
        default: "",
    },
    
    birthCertPic:{
        type: String,
        default: "",
    },

    email:{
        type: String,
        unique: true,
    },

    password:{
        type: String,
        required:true,
    },

    resetToken:{
        type: String,
    },

    expireToken:{
        type: Date,
    },
}, 
{ timestamps: true }
);

module.exports = mongoose.model("citizen", citizenSchema);
