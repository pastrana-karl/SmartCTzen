const router = require("express").Router();
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

//GET SPECIFIC SUPER ADMIN
router
    .route("/:id")
    .get(superAdminController.GetSpecificSuperAdmin);

//COMPARE PASSWORD
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