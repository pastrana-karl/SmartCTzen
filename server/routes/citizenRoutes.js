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

module.exports = router;