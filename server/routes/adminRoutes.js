const router = require("express").Router();
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");

//REGISTER

router.post("/register", async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newAdmin = new Admin({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })

        const admin = await newAdmin.save();

        res.status(200).json(admin);
    }catch(err){
        res.status(500).json(err);
    }
});

//LOGIN

router.post("/login", async (req, res) => {
    try{
        const admin = await Admin.findOne({ username: req.body.username });
        if(!admin)
        {
            return res.status(400).json("Wrong Credentials!!");
        }
        const validated = await bcrypt.compare(req.body.password, admin.password);
        if(!validated)
        {
            return res.status(400).json("Wrong Credentials!!");
        }

        const { password, ...others } = admin._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;