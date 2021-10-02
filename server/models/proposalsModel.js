const mongoose = require("mongoose");
const slugify = require("slugify");

const proposalsSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    userType: {
        type: String,
    },
    userName: {
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
        type: String,
    },
    upvote:[
        {type: String}
    ],
    downvote:[
        {type: String}
    ],
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    comments:[
        {
            user :{type: String},
            message:{type: String}
        }
    ]
}, { timestamps: true });
// [
//     {"kevin","this is a good proposal"}, {"ivann","i agree, we can improve on this"}
// ]


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