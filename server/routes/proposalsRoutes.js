const express = require('express');

const proposalsController = require("../controllers/proposalsController");

const proposalsRouter = express.Router();

//use this as the address in postman
proposalsRouter
    .route("/proposals/topProposals")
    .get(proposalsController.getTopProposals);

proposalsRouter
    .route("/proposals")
    .get(proposalsController.getAllProposals)
    .post(proposalsController.postProposal);

proposalsRouter
    .route("/proposals/approved")
    .get(proposalsController.getApprovedProposals);

proposalsRouter
    .route("/proposals/rejected")
    .get(proposalsController.getRejectedProposals);

proposalsRouter
    .route("/proposals/:id")
    .get(proposalsController.getProposal)
    .patch(proposalsController.updateProposal)
    .delete(proposalsController.deleteProposal);

proposalsRouter.patch("/proposals/approve/:id", proposalsController.approveProposal);

module.exports = proposalsRouter;