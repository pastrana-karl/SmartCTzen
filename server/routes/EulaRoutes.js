const router = require("express").Router();
const Eula = require("../models/EulaModel");

//CREATE EULA

router.post('/agreement', async (req, res) => {
    const eula = new Eula(req.body);

    try {
        const saveEula = await eula.save();
        res.status(200).json(saveEula);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET EULA
router.get('/', async (req, res) => {
    try {
        const eula = await Eula.find();
        res.status(200).json(eula);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //UPDATE EULA
router.put('/:id', async (req, res) => {
    try{
        const updatedEula = await Eula.findByIdAndUpdate(req.params.id,{
            $set: { "message": req.body.message}
        },
        { new:true }
        );

        res.status(200).json(updatedEula);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;