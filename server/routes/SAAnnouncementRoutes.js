const router = require("express").Router();
const Announcement = require("../models/SAAnnouncementModel");

//CREATE ANNOUNCEMENT

router.post('/announcement', async (req, res) => {
    const Announce = new Announcement(req.body);

    try {
        const saveAnnounce = await Announce.save();
        res.status(200).json(saveAnnounce);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ANNOUNCEMENT
router.get('/', async (req, res) => {
    try {
        const saMessage = await Announcement.find();
        res.status(200).json(saMessage);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET SPECIFIC ANNOUNCEMENT
router.get("/:id", async (req, res) => {
    try{
        const saMessage = await Announcement.findById(req.params.id);
        res.status(200).json(saMessage);
    }catch(err){
         res.status(500).json(err);
    }
});

//DELETE ANNOUNCEMENT
router.delete("/:id", async (req, res) => {
    try {
        const saMessage = await Announcement.findById(req.params.id);
        await saMessage.delete();
        res.status(200).json("Announcement has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;