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
    .delete(reportsController.deleteReports);

reportsRouter
    .route("/reports/:id/histories")
    .get(reportsController.getReportsHistory);

// reportsRouter
//     .route("/reports/count")
//     .get(reportsController.countReportsTotal);

module.exports = reportsRouter;