const mongoose = require("mongoose");

const SAAnnouncement = new mongoose.Schema({
    username:{
        type:String,
    },
    message:{
        type:String,
    },
}, { timestamps: true } )

module.exports = mongoose.model("SAAnnouncement", SAAnnouncement);