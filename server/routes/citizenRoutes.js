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

module.exports = router;