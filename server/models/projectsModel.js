const mongoose = require("mongoose");
const slugify = require("slugify");

const projectsSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    userType: {
        type: String,
    },
    userName: {
        type: String,
        // required: [true, 'This field is required']
    },
    title: {
        type: String,
        required: [true, 'This field is required']
    },
    description: {
        type: String,
        required: [true, 'This field is required']
    },
    slug: String,
    date: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: String,
        enum: ['Ongoing', 'Accomplished'],
        default: 'Ongoing'
    },
    location:  {
        type: String,
        required: [true, 'This field is required']
    },
    coverImage: {
        type: String,
        // required: [true, 'This field is required']
    },
    viewCount:{
        type: Number
    }
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
projectsSchema.pre('save', function(next) {
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

const Projects = mongoose.model('Projects', projectsSchema);

module.exports = Projects;