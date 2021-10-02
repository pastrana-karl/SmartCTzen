const mongoose = require("mongoose");
const slugify = require("slugify");

const reportsSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    userType: {
        type: String,
    },
    title: {
        type: String,
        required: [true, 'This field is required']
    },
    description: {
        type: String,
        required: [true, 'This field is required']
    },
    // slug: String,
    location: {
        type: String,
        required: [true, 'This field is required']
    },
    // photo: {
    //     type: String,
    //     default: 'No Image',
    // },
    images: { 
        type: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Resolved', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
reportsSchema.pre('save', function(next) {
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

const Reports = mongoose.model('Reports', reportsSchema);

module.exports = Reports;