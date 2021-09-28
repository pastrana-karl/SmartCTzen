const mongoose = require("mongoose");

const EulaSchema = new mongoose.Schema({
    message:{
        type:String,
    },
}, { timestamps: true } )

module.exports = mongoose.model("Eula", EulaSchema);