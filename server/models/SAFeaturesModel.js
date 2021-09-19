const mongoose = require("mongoose");

const SAFeaturesSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    contents:{
        type:String,
    },
    position:{
        type:String,
    },
    featurePic:{
        type:String,
        default:"",
    },
}, { timestamps: true } )

module.exports = mongoose.model("SAFeatures", SAFeaturesSchema);