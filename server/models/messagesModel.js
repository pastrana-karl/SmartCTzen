const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
    conversationId: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: String,
        default: 'Start conversation'
    }
},
{
    timestamps: true
}
);

const Messages = mongoose.model("Messages", MessagesSchema);

module.exports = Messages;