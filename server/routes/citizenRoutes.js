const router = require("express").Router();
const citizenController = require("../controllers/citizenController");

//REGISTER
router
    .route("/register")
    .post(citizenController.registerCitizen); 

//Login
router
    .route("/login")
    .post(citizenController.loginCitizen);

//Get Citizen
router
    .route("/:id")
    .get(citizenController.getCitizen);

//Get Applicants
router
    .route("/")
    .get(citizenController.applicants);

//Reject Applicants
router
    .route("/:id")
    .delete(citizenController.rejectApplicant);

//Accept Applicants
router
    .route("/:id")
    .post(citizenController.acceptApplicant);

module.exports = router;