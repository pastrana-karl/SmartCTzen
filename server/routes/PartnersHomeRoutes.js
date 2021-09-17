const router = require("express").Router();
const Partners = require("../models/PartnersHomeModel");

//CREATE PARTNERS

router.post('/', async (req, res) => {
    const updateCount = new Partners(req.body);

    try {
        const savedCount = await updateCount.save();
        res.status(200).json(savedCount);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;