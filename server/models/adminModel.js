const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
    },

    resetToken:{
        type:String,
    },

    expireToken:{
        type:Date,
    },

    profilePic:{
        type:String,
        default:"",
    },
}, 
{ timestamps: true }
);

module.exports = mongoose.model("admin", adminSchema);
