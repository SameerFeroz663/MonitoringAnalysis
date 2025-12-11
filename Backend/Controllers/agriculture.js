const model = require('../model/agriculture');
const express = require('express');
const router = express.Router();

router.post('/', async(req,res) =>{
    try{
        const entry = new model(req.body);
        const saved = await entry.save();
        res.status(200).json({message:"Data Saved Succesfully", data:saved})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})
router.get('/', async(req,res) =>{
    try{
        const data = await model.find().sort({createdAt:-1});
        res.status(200).json({data:data})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})
module.exports = router;