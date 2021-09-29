const router = require("express").Router();
const History = require("../models/diffCollectionModel");

router.get('/citizens', async (req, res) => {
    try {
        const citizenHis = await History.find({ user:req.query.user });
        console.log(citizenHis)
        res.status(200).json(citizenHis);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;