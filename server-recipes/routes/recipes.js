const express = require('express');
const mongoose = require('mongoose');
const { Recipes, User } = require('../db/db');

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

router.put('/', async(req, res)=>{
    try{
        const recipe = await Recipes.findById(req.body.recipeID);
        const user = await User.findById(req.body.id);

        user.savedRecipes.push(recipe);
        await user.save();
        
        res.json({savedRecipes: user.savedRecipes});
    }
    catch(err){
        res.status(400).json(err);
    }
});

router.get('/view-recipes', async(req, res)=>{
    try{
        const recipes = await Recipes.find({});

        res.json({
            recipes
        });

    }
    catch(err){
        res.status(404).json({
            msg : 'There was an error'
        })
    }
});


router.get('/savedRecipes/ids', async(req, res)=>{
    try{
        const user = await User.findById(req.body.id);

        res.json({savedRecipes : user?.savedRecipes});
    }
    catch(err){
        return res.status(404).json(err);
    }
});

router.get('/savedRecipes', async(req, res)=>{
    try{
        const user = await User.findById(req.body.id);
        const savedRecipes = await Recipes.find({
            _id : { $in : user.savedRecipes },
        });

        res.json({savedRecipes});
    }
    catch(err){
        return res.status(404).json(err);
    }
});



module.exports = router;