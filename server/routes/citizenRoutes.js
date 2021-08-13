const router = require("express").Router();
const Citizen = require("../models/citizenModel");
const bcrypt = require("bcrypt");


//REGISTER

router.post("/register", async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newCitizen = new Citizen({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })

        const citizen = await newCitizen.save();

        res.status(200).json(citizen);
    }catch(err){
        res.status(500).json(err);
    }
});

//LOGIN

router.post("/login", async (req, res) => {
    try{
        const citizen = await Citizen.findOne({ username: req.body.username });
        if(!citizen)
        {
            return res.status(400).json("Wrong Credentials!!");
        }
        const validated = await bcrypt.compare(req.body.password, citizen.password);
        if(!validated)
        {
            return res.status(400).json("Wrong Credentials!!");
        }

        const { password, ...others } = citizen._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;