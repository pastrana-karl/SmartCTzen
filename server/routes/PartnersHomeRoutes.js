const router = require("express").Router();
const Partners = require("../models/PartnersHomeModel");

//DELETE PARTNERS COUNT
router.delete("/:id", async (req, res) => {
    try {
        const partnerCount = await Partners.findById(req.params.id);
        await partnerCount.delete();
        res.status(200).json("Partner count has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE PARTNERS COUNT
router.post('/update', async (req, res) => {
    const updateCount = new Partners(req.body);

    try {
        const savedCount = await updateCount.save();
        res.status(200).json(savedCount);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET UPDATED COUNT
router.get('/', async (req, res) => {
    try {
        const count = await Partners.find();
        res.status(200).json(count);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;