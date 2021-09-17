const mongoose = require("mongoose");

const PartnersHomeSchema = new mongoose.Schema({
    communities:{
        type:Number,
    },
    users:{
        type:Number,
    },
    members:{
        type:Number,
    },
}, { timestamps: true } )

module.exports = mongoose.model("PartnersHome", PartnersHomeSchema);