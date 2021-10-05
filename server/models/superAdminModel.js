const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength: 8,
    },

    resetToken:{
        type:String,
    },

    expireToken:{
        type:Date,
    },
}, 
{ timestamps: true }
);

module.exports = mongoose.model("superAdmin", superAdminSchema);
