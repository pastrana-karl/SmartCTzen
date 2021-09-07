const mongoose = require("mongoose");
const slugify = require("slugify");

const featuresSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'This field is required']
    },
    description: {
        type: String,
        required: [true, 'This field is required']
    },
    logo: {
        type: String,
        required: [true, 'This field is required']
    }
});

const Features = new mongoose.model('Features', featuresSchema);

module.exports = Features;
