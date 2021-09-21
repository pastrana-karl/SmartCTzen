const Messages = require('../models/messagesModel');

const catchAsync = require('../utils/catchAsync');

exports.createMessage = catchAsync(async (req, res, next) => {
    const newMessage = new Messages(req.body);

    const savedMessage = await newMessage.save();

    res.status(200).json( savedMessage );
});

exports.getMessage = catchAsync(async (req, res, next) => {
    const messages = await Messages.find({
        conversationId: req.params.id,
    });

    // res.status(200).json({
    //     status: 'success',
    //     messages
    // });

    res.status(200).json(
        messages
    );
});