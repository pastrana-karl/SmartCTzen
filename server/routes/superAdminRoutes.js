const router = require("express").Router();
const SuperAdmin = require("../models/superAdminModel");
const bcrypt = require("bcrypt");


//REGISTER

router.post("/register", async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newSuperAdmin = new SuperAdmin({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })

        const superadmin = await newSuperAdmin.save();

        res.status(200).json(superadmin);
    }catch(err){
        res.status(500).json(err);
    }
});

//LOGIN

router.post("/login", async (req, res) => {
    try{
        const superadmin = await SuperAdmin.findOne({ username: req.body.username });
        if(!superadmin)
        {
            return res.status(400).json("Wrong Credentials!!");
        }
        const validated = await bcrypt.compare(req.body.password, superadmin.password);
        if(!validated)
        {
            return res.status(400).json("Wrong Credentials!!");
        }

        const { password, ...others } = superadmin._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;