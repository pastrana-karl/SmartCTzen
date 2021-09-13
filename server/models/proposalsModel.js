const mongoose = require("mongoose");
const slugify = require("slugify");
const diffHistory = require("mongoose-audit-trail");

const proposalsSchema = new mongoose.Schema({
    userId: {
        type: String,
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
        trim: true
    },
    date:  {
        type: String,
        required: [true, 'This field is required'],
    },
    location:  {
        type: String,
        required: [true, 'This field is required'],
        trim: true
    },
    coverImage: {
        type: String
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

proposalsSchema.plugin(diffHistory.plugin);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
proposalsSchema.pre('save', function(next) {
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

const Proposals = mongoose.model('Proposals', proposalsSchema);

module.exports = Proposals;