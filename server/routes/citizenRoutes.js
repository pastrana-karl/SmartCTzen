const router = require("express").Router();
const citizenController = require("../controllers/citizenController");

//Get Applicants
router
    .route("/")
    .get(citizenController.applicants);
    
//REGISTER
router
    .route("/register")
    .post(citizenController.registerCitizen); 

//Login
router
    .route("/login")
    .post(citizenController.loginCitizen);

//CHANGE STATUS ON LOGOUT
router
    .route("/citizenLogout")
    .post(citizenController.CitizenLogout);


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

//Reject Applicants
router
    .route("/:id")
    .delete(citizenController.deleteUser);

//Handle Users
router
    .route("/:id")
    .post(citizenController.handleUsers);

module.exports = router;