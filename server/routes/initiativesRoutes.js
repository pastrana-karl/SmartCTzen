const express = require('express');

const initiativesController = require("../controllers/initiativesController");

const initiativesRouter = express.Router();

initiativesRouter
    .route("/initiatives")
    .get(initiativesController.getAllInitiatives)
    .post(initiativesController.postInitiaves);

initiativesRouter
    .route("/initiatives/:id")
    .get(initiativesController.getInitiative)
    .patch(initiativesController.updateInitiative)
    .delete(initiativesController.deleteInitiative);

initiativesRouter
    .route("/initiatives/approved")
    .get(initiativesController.aliasApprovedInitiatives, initiativesController.getAllInitiatives);

initiativesRouter
    .route("/initiatives/rejected")
    .get(initiativesController.aliasRejectedInitiatives, initiativesController.getAllInitiatives);

module.exports = initiativesRouter;