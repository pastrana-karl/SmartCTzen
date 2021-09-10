const mongoose = require('mongoose');

const ConversationsSchema = new mongoose.Schema({
    members: {
        type: Array,
    }
},
{
    timestamps: true
}
);

const Conversations = mongoose.model("Conversations", ConversationsSchema);

module.exports = Conversations;