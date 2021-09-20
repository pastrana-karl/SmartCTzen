const router = require("express").Router();
const SAFeatures = require('../models/SAFeaturesModel');

//CREATE FEATURES
router.post('/newFeatures', async (req, res) => {
    const Features = new SAFeatures(req.body);

    try {
        const saveFeatures = await Features.save();
        res.status(200).json(saveFeatures);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET FEATURES
router.get('/', async (req, res) => {
    try {
        const Features = await SAFeatures.find();
        res.status(200).json(Features);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET SPECIFIC FEATURES
router.get("/:id", async (req, res) => {
    try{
        const Features = await SAFeatures.findById(req.params.id);
        res.status(200).json(Features);
    }catch(err){
         res.status(500).json(err);
    }
});

//DELETE FEATURES
router.delete("/:id", async (req, res) => {
    try {
        const Features = await SAFeatures.findById(req.params.id);
        await Features.delete();
        res.status(200).json("Feature has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;