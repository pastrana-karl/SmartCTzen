const mongoose = require('mongoose');

const diffCollectionSchema = new mongoose.Schema(
{
    collectionName: {
        type: String
    },
    collectionId: {
        type: String
    },
    diff: {
        type: String
    },
    user: {
        type: String
    },
    reason: {
        type: String
    }
}, { timestamps: true });

module.exports = diffCollection = mongoose.model('diffCollection', diffCollectionSchema);