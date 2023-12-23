const express = require('express');
const mongoose = require('mongoose');
const { Recipes } = require('../db/db');

const router = express.Router();

router.get('/', async (req, res)=>{

    try{
        const data = await Recipes.find({})
        res.json(data);
    }
    catch(err){
        res.status(404).json({
            msg : 'Error occured'
        });
    }
});

router.post('/', async(req, res)=>{
    const recipe = new Recipes(req.body);

    try{
        const response = await recipe.save();
        res.json(response);
    }
    catch(err){
        res.json(err);
    }
});


module.exports = router;