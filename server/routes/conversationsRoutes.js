const express = require('express');

const conversationsController = require('../controllers/conversationsController');

const conversationsRouter = express.Router();

conversationsRouter
    .route('/conversations')
    .post(conversationsController.createConversation);

conversationsRouter
    .route('/conversations/:id')
    .get(conversationsController.getConversation);

module.exports = conversationsRouter;