const Conversations = require('../models/conversationsModel');

const catchAsync = require('../utils/catchAsync');

exports.createConversation = catchAsync(async (req, res, next) => {
    const newConversation = new Conversations({
        members: [req.body.senderID, req.body.receiverID],
    });

    const savedConversation = await newConversation.save();
    res.status(200).json({
        status: 'success',
        data: {
            savedConversation
        }
    });
});

exports.getConversation = catchAsync(async (req, res, next) => {
    const conversation = await Conversations.find({
        members: { $in: [req.params.id] }
    });
    
    res.status(200).json(conversation);
});

//get conversation includes two userId
exports.getConvoWithId = catchAsync(async (req, res, next) => {
    // const conversation = await Conversations.find({
    //     members: { $in: [req.params.firstUserId] }
    // });
    const conversation = await Conversations.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
});