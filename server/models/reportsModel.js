const mongoose = require("mongoose");
const slugify = require("slugify");
const diffHistory = require("mongoose-audit-trail");

const reportsSchema = new mongoose.Schema({
    userName: {
        type: String
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
    // date: {
    //     type: String,
    //     required: [true, 'This field is required']
    // },
    location: {
        type: String,
        required: [true, 'This field is required']
    },
    // photo: {
    //     type: String,
    //     required: [true, 'This field is required']
    // }
    status: {
        type: String,
        enum: ['Need action', 'Confirmed', 'Resolved'],
        default: 'Need action'
    }
});

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

reportsSchema.plugin(diffHistory.plugin);

const Reports = mongoose.model('Reports', reportsSchema);

module.exports = Reports;