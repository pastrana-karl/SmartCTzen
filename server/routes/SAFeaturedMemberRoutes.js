const router = require("express").Router();
const FeaturedMember = require('../models/SAFeaturedMemberModel');

//CREATE FEATURED MEMBER
router.post('/featuredMember', async (req, res) => {
    const Featured = new FeaturedMember(req.body);

    try {
        const saveFeatured = await Featured.save();
        res.status(200).json(saveFeatured);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET SPECIFIC FEATURED MEMBER
router.get("/:id", async (req, res) => {
    try{
        const saFeatured = await FeaturedMember.findById(req.params.id);
        res.status(200).json(saFeatured);
    }catch(err){
         res.status(500).json(err);
    }
});

//GET FEATURED MEMBER
router.get('/', async (req, res) => {
    try {
        const saFeatured = await FeaturedMember.find();
        res.status(200).json(saFeatured);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE FEATURED MEMBER
router.delete("/:id", async (req, res) => {
    try {
        const saFeatured = await FeaturedMember.findById(req.params.id);
        await saFeatured.delete();
        res.status(200).json("Featured Member has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;