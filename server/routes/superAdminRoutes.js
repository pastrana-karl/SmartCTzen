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

// router.post("/register", async (req, res) => {
//     try{

//     }catch(err){
//         res.status(500).json(err);
//     }
// });



// router.post("/login", async (req, res) => {
//     try{
       
//     }catch(err){
//         res.status(500).json(err);
//     }
// });

module.exports = router;