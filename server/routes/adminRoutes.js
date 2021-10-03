const router = require("express").Router();
const adminController = require("../controllers/adminController");
const Admin = require('../models/adminModel');


router.get('/me', adminController.getMe, adminController.getAdmin);

//DISPLAY ALL ADMIN
router.get("/", async (req, res) => {
    const adminName = req.query.user;

    try{
        let admins;

        if(adminName) {
            admins = await Admin.find({ username:adminName }).collation({locale: "en", strength: 2});
        } else {
            admins = await Admin.find().sort({username:1});
        }

        res.status(200).json(admins);
    }catch(err){
         res.status(500).json(err);
    }
});

//REGISTER
router
    .route("/register")
    .post(adminController.registerAdmin);

//LOGIN    
router
    .route("/login")
    .post(adminController.loginAdmin);

//FORGOT PASSWORD    
router
    .route("/reset-password")
    .post(adminController.forgotAdmin);

//CHANGE PASSWORD    
router
    .route("/new-password")
    .post(adminController.changeAdminPassword);

//COMPARE PASSWORD
router
    .route("/password-adminCompare")
    .post(adminController.PassWordCompare);

router
    .route('/:id')
    .put(adminController.updateAdmin);

//GET SPECIFIC ADMIN
router.get("/:id", async (req, res) => {
    try{
        const admin = await Admin.findById(req.params.id);
        res.status(200).json(admin);
    }catch(err){
         res.status(500).json(err);
    }
});

//Delete Admin
router.delete("/:id", async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        await admin.delete();
        res.status(200).json("Admin has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});


// router.post("/register", async (req, res) => {
//     try{
//         const salt = await bcrypt.genSalt(10);
//         const hashedPass = await bcrypt.hash(req.body.password, salt);
//         const newAdmin = new Admin({
//             username: req.body.username,
//             email: req.body.email,
//             password: hashedPass,
//         })

//         const admin = await newAdmin.save();

//         res.status(200).json(admin);
//     }catch(err){
//         res.status(500).json(err);
//     }
// });

//LOGIN

// router.post("/login", async (req, res) => {
//     try{
//         const admin = await Admin.findOne({ username: req.body.username });
//         if(!admin)
//         {
//             return res.status(400).json("Wrong Credentials!!");
//         }
//         const validated = await bcrypt.compare(req.body.password, admin.password);
//         if(!validated)
//         {
//             return res.status(400).json("Wrong Credentials!!");
//         }

//         const { password, ...others } = admin._doc;
//         res.status(200).json(others);
//     }catch(err){
//         res.status(500).json(err);
//     }
// });

module.exports = router;