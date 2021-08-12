const express = require("express");

const featuresController = require("../controllers/featuresController");

const featuresRouter = express.Router();

featuresRouter
    .route("/features")
    .get(featuresController.getAllFeatures)
    .post(featuresController.postFeature);

featuresRouter
    .route("/features/:id")
    .patch(featuresController.patchFeature)
    .delete(featuresController.deleteFeature);

module.exports = featuresRouter;