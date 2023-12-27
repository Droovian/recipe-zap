const express = require('express');
const mongoose = require('mongoose');
const { Recipes, User } = require('../db/db');
const { verifyToken } = require('../middleware/jwt');
const { validateRecipes } = require('../middleware/zod');
const router = express.Router();

router.get('/', verifyToken, async (req, res)=>{

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


router.get('/own-recipes', verifyToken,  async(req, res) => {

    const userId = req.userId;
    try{
        const userRecipes = await Recipes.find({ userOwner: userId });

        if(!userRecipes || userRecipes.length === 0){
            return res.status(404).json({
                msg : 'User doesnt have any recipes posted'
            });
        }

        res.json({
            userRecipes
        });
    }
    catch(error){
        res.status(500).json({
            msg : 'Error occured, recipes dont exist here'
        });
    }
});


router.post('/upload', verifyToken,  async(req, res)=>{
    
    const name = req.body.name;
    const userId = req.userId;

    try{

        const dish = await Recipes.find({ name, userOwner: userId });

        if(dish.length > 0){
            return res.status(401).json({
                msg : 'It looks like you have already posted this recipe'
            });
        }

        const validator = validateRecipes(req.body);

        if(!validator.success){
            res.status(400).json({
                msg: 'Enter valid data please',
                errors: validator.error.errors
            });
            return;
        }

        const recipe = new Recipes({
            name: req.body.name,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            imageUrl: req.body.imageUrl, 
            cookingTime: req.body.cookingTime,
            userOwner: req.userId,
        });

        const response = await recipe.save();
        res.status(200).json(response);
    }
    catch(err){
        res.status(404).json(err);
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

router.get('/view-recipes', verifyToken, async(req, res)=>{
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