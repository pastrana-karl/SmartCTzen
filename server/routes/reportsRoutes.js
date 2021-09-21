const express = require("express");

const reportsController = require("../controllers/reportsController");

const reportsRouter = express.Router();

reportsRouter
    .route("/reports")
    .get(reportsController.getAllReports)
    .post(reportsController.postReports);

reportsRouter
    .route("/reports/:id")
    .get(reportsController.getReport)

reportsRouter
    .route("/reports/:id/histories")
    .get(reportsController.getReportsHistory);

module.exports = reportsRouter;