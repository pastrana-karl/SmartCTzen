const router = require("express").Router();
const History = require("../models/diffCollectionModel");

router.get('/citizens', async (req, res) => {
    try {
        const citizenHis = await History.find({ user:req.query.user }).sort({createdAt: -1});
        res.status(200).json(citizenHis);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/administrator', async (req, res) => {
    try {
        const adminHis = await History.find({ userType:req.query.userType }).sort({createdAt: -1});
        res.status(200).json(adminHis);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;