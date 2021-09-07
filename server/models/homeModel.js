const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
    header: {
        type: String,
        required: [true, 'This field is required']
    },
    partnerCommunities: {
        type: Number,
        required: [true, 'This field is required']
    },
    users: {
        type: Number,
        required: [true, 'This field is required']
    },
    members: {
        type: Number,
        required: [true, 'This field is required']
    },
    message: {
        type: String,
        required: [true, 'This field is required']
    }
});

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;