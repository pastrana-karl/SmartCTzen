const mongoose = require('mongoose');
const diffHistory = require('mongoose-audit-trail');

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
},
{
    timestamps: true
}
);

diffCollectionSchema.plugin(diffHistory.plugin);

const diffCollection = mongoose.model('diffCollection', diffCollectionSchema);

module.exports = diffCollection;