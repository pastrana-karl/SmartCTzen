const express = require('express');

const messagesController = require('../controllers/messagesController');

const messagesRouter = express.Router();

messagesRouter
    .route('/messages')
    .post(messagesController.createMessage);

messagesRouter
    .route('/messages/:id')
    .get(messagesController.getMessage);



module.exports = messagesRouter;