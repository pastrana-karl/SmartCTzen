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
    .route("/proposals/testroute")
    .get(proposalsController.testroute)

proposalsRouter
    .route("/proposals/rejected")
    .get(proposalsController.getRejectedProposals);

proposalsRouter
    .route("/proposals/upVote/:id")
    .patch(proposalsController.upVote);

// proposalsRouter
//     .route("/proposals/downVote/:id")
//     .patch(proposalsController.downVote);

// proposalsRouter
//     .route("/proposals/removeUpVote/:id")
//     .patch(proposalsController.removeUpVote);

// proposalsRouter
//     .route("/proposals/removeDownVote/:id")
//     .patch(proposalsController.removeDownVote); 

proposalsRouter
    .route("/proposals/:id")
    .get(proposalsController.getProposal)
    .put(proposalsController.updateProposal)
    .delete(proposalsController.deleteProposal);

proposalsRouter.patch("/proposals/approve/:id", proposalsController.approveProposal);

module.exports = proposalsRouter;