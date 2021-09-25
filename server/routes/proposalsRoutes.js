const express = require('express');

const proposalsController = require("../controllers/proposalsController");

const proposalsRouter = express.Router();

//use this as the address in postman
proposalsRouter
    .route("/proposals")
    .get(proposalsController.getAllProposals)
    .post(proposalsController.postProposal);

proposalsRouter
    .route("/proposals/:id")
    .get(proposalsController.getProposal)
    .patch(proposalsController.updateProposal)
    .delete(proposalsController.deleteProposal);

proposalsRouter
    .route("/proposals/approved")
    .get(proposalsController.aliasApprovedProposals, proposalsController.getAllProposals);

proposalsRouter
    .route("/proposals/rejected")
    .get(proposalsController.aliasRejectedProposals, proposalsController.getAllProposals);

proposalsRouter
    .route("/proposals/:id/histories")
    .get(proposalsController.getProposalHistory);

module.exports = proposalsRouter;