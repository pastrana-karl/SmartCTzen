const mongoose = require("mongoose");
const slugify = require("slugify");

const featuresSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'This field is required']
    },
    slug: String,
   description: {
        type: String,
        required: [true, 'This field is required']
    },
    logo: {
        type: String,
        required: [true, 'This field is required']
    }
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
/*
Code composition: 
    mongooseSchema.pre('save', function(next){
        this.slug = slugify(<parameter that will be used as slug>, <slugify arguments>);
        next()
    })
*/
featuresSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

const Features = new mongoose.model('Features', featuresSchema);

module.exports = Features;
