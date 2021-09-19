const mongoose = require("mongoose");

const SAFeaturedMemberSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    position:{
        type:String,
    },
    message:{
        type:String,
    },
    profilePic:{
        type:String,
        default:"",
    },
}, { timestamps: true } )

module.exports = mongoose.model("SAFeaturedMember", SAFeaturedMemberSchema);