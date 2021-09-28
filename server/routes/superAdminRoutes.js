const router = require("express").Router();
const bcrypt = require("bcrypt");

const superAdminController = require('../controllers/superAdminController');

//REGISTER
router
    .route("/register")
    .post(superAdminController.registerSuperAdmin);

//LOGIN
router
    .route("/login")
    .post(superAdminController.loginSuperAdmin);

//UPDATE ACCOUNT
router
    .route("/:id")
    .put(superAdminController.UpdateSuperAdmin);

//GET SPECIFIC FEATURED MEMBER
router
    .route("/:id")
    .get(superAdminController.GetSpecificSuperAdmin);

//GET SPECIFIC FEATURED MEMBER
router
    .route("/password-compare")
    .post(superAdminController.PassWordCompare);

//FORGOT PASSWORD REQUEST
router
    .route("/reset-password")
    .post(superAdminController.PasswordChangeReq)

//FORGOT PASSWORD CHANGE    
router
    .route("/change-password")
    .post(superAdminController.PasswordChange)

module.exports = router;