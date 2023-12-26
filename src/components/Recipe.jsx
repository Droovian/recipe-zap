import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Recipe = () => {

  const [cookies, setCookies] = useCookies(["access_token"]);
  const token = localStorage.getItem("access_token");


  const [recipeData, setRecipeData] = useState({
    name: '',
    ingredients: [],
    instructions: "",
    imageUrl: '',
    cookingTime: 0,
    userOwner: 0,
  });

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:3000/recipes/upload', recipeData , {
        headers:{
          Authorization: `${token}`
        }
      });

      console.log(recipeData);
      console.log('Recipe uploaded', response.data);
    }
    catch(error){
      console.log('some error occured');
    }
  }

  return (
      <div>
        <div>
          <h1 className='text-2xl font-bold text-black flex justify-center p-4'>Add Recipes</h1>
        </div>

        {
          cookies.access_token
          ?
          (
        <div>
          <form className='flex flex-col space-y-3 justify-center p-4 max-w-md mx-auto' onSubmit={handleSubmit}>
            <label htmlFor="name">Recipe Name</label>
            <input type="text" value={recipeData.name} 
            onChange={(e) => {
              setRecipeData({...recipeData, name: e.target.value})
            }}
            className='border p-2 rounded-md'/>
            <label htmlFor="ingredients">Ingredients</label>
            <input type="text"
            value={recipeData.ingredients.join(', ')}
            onChange={(e) => {
              setRecipeData({...recipeData, ingredients: e.target.value.split(', ')})
            }}
             className='border p-2 rounded-md'/>
            <label htmlFor="instructions">Instructions</label>
            <input type="text"
            value={recipeData.instructions}
            onChange={(e) => setRecipeData({ ...recipeData, instructions: e.target.value })}
             className='border p-2 rounded-md' />
            <label htmlFor="Image">Provide an Image</label>
            <input type="text"
            value={recipeData.imageUrl}
            onChange={(e) => setRecipeData({ ...recipeData, imageUrl: e.target.value })}
             className='border p-2 rounded-md' />
            <label htmlFor="cooking-time">Cooking Time</label>
            <input
              type="number"
              value={recipeData.cookingTime || ''}
              onChange={(e) => setRecipeData({ ...recipeData, cookingTime: parseInt(e.target.value, 10) || 0 })}
              className='border p-2 rounded-md'
            />

            <button className='mx-auto w-1/2 px-3 py-2 bg-yellow-600 hover:bg-yellow-500 border rounded-md text-white mb-3'>Submit</button>
            
          </form>
        </div>
          ) : (
            <div className='flex justify-center items-center h-32'>
              <h2 className='font-semibold text-2xl mx-3 underline text-red-500'>Kindly login to add recipes</h2>
            </div>
          )
        }
      </div>
    
  );
};

export default Recipe;
