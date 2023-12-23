const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/recipe-zap')
.then(()=>{console.log('mongodb connected');});

const UserSchema = new mongoose.Schema({
    id: String,
    username: String,
    email: String,
    password: String,
    savedRecipes : [{type : mongoose.Schema.Types.ObjectId, ref: "recipes"}]
});

const RecipeSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    ingredients:[{
        type: String,
        required: true
    }],
    instructions:[{
        type: String,
        required: true
    }],
    imageUrl: {
        type: String,
        required: true
    },
    cookingTime:{
        type: Number,
        required: true
    },
    userOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "users",
        required: true
    }
});

const User = mongoose.model('users', UserSchema);
const Recipes = mongoose.model('recipes', RecipeSchema);

module.exports = {
    User,
    Recipes
}
