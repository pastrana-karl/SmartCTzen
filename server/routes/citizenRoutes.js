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

//COMPARE PASSWORD
router
    .route("/password-citizenCompare")
    .post(citizenController.PassWordCompare);

//Forgot Password
router
    .route("/citizenForgot")
    .post(citizenController.PasswordChangeReq);

//Change Password
router
    .route("/citizenChange")
    .post(citizenController.ChangePassword);

//Update Citizen
router
    .route("/:id")
    .put(citizenController.UpdateCitizen);

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