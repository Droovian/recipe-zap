const express = require('express');
const { Recipes, User } = require('../db/db');
const { verifyToken } = require('../middleware/jwt');
const { validateRecipes } = require('../middleware/zod');
const router = express.Router();

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
        const userId = req.userId;

        const check = await User.findById(userId);

        console.log(check);
        if(!check){
            return res.status(404).json({
                msg : 'User not found or there was an error'
            })
        }
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

router.delete('/delete/:id', verifyToken,  async(req, res) => {

    const recipeId = req.params.id;

    try{
        const recipe = await Recipes.findById(recipeId);

        if(!recipe){
            return res.status(404).json({
                msg : "Recipe was not found"
            });
        }

        await Recipes.findByIdAndDelete(recipeId);

        res.status(200).json({
            msg : "Recipe has been deleted successfully"
        });
    }
    catch(error){
        res.status(404).json({
            msg : "Error while deleting"
        });
    }
});

module.exports = router;