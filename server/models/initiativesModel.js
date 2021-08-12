const mongoose = require("mongoose");
const slugify = require("slugify");

const initiativesSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, 'This field is required'],
        trim: true
    },
    title: {
        type: String,
        required: [true, 'This field is required'],
        trim: true
    },
    slug: String,
    description:  {
        type: String,
        required: [true, 'This field is required'],
        trim: true,
        unique: true
    },
    date:  {
        type: Date,
        required: [true, 'This field is required'],
    },
    location:  {
        type: String,
        required: [true, 'This field is required'],
        trim: true
    },
    coverImage: {
        type: String,
        required: [true, 'This field is required']
    },
    images: { 
        type: [String],
    },
    upvote: {
        type: Number
    },
    downvote: {
        type: Number
    },
    status: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
initiativesSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
    /*
        Code composition: 
            mongooseSchema.pre('save', function(next){
                this.slug = slugify(<parameter that will be used as slug>, <slugify arguments>);
                next()
            })
    */  
});

const Initiatives = mongoose.model('Initiatives', initiativesSchema);

module.exports = Initiatives;