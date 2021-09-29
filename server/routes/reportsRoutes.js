const express = require("express");

const reportsController = require("../controllers/reportsController");

const reportsRouter = express.Router();

reportsRouter
    .route("/reports")
    .get(reportsController.getAllReports)
    .post(reportsController.postReports);

reportsRouter
    .route("/reports/resolved")
    .get(reportsController.getResolvedReports);

reportsRouter
    .route("/reports/confirmed")
    .get(reportsController.getConfirmedReports);

reportsRouter
    .route("/reports/cancelled")
    .get(reportsController.getCancelledReports);

reportsRouter
    .route("/reports/:id")
    .get(reportsController.getReport)
    .delete(reportsController.deleteReports);

// reportsRouter
//     .route("/reports/count")
//     .get(reportsController.countReportsTotal);

module.exports = reportsRouter;