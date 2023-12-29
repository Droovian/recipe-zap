import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Recipe = () => {

  const [cookies, setCookies] = useCookies(["access_token"]);
  const [success, setSuccessMessage] = useState('');
  const [error, setErrorMessage] = useState('');

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

      // console.log(recipeData);
      setSuccessMessage('Recipe has been uploaded. That seems delicious.')
      console.log('Recipe uploaded', response.data);
    }
    catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
        if (error.response.status === 401) {
          setErrorMessage('It looks like you have already posted this recipe');
        } else if (error.response.status === 400) {
          setErrorMessage('Bad Request: Please check your input data.');
        } else {
          setErrorMessage('Error: Something went wrong.');
        }
      } else if (error.request) {
        console.error('Request Error:', error.request);
        setErrorMessage('Error: No response received from the server.');
      } else {
        console.error('Other Error:', error.message);
        setErrorMessage('Error: Something went wrong.');
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-t from-amber-600 to-amber-300">
    <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
    {cookies.access_token ?(<h1 className="text-3xl font-bold text-center mb-6">Add Recipe</h1>) : null}
      {cookies.access_token ? (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Recipe Name
            </label>
            <input
              type="text"
              id="name"
              value={recipeData.name}
              onChange={(e) => setRecipeData({ ...recipeData, name: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-600">
              Ingredients
            </label>
            <input
              type="text"
              id="ingredients"
              value={recipeData.ingredients.join(', ')}
              onChange={(e) => setRecipeData({ ...recipeData, ingredients: e.target.value.split(', ') })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-600">
              Instructions
            </label>
            <input
              type="text"
              id="instructions"
              value={recipeData.instructions}
              onChange={(e) => setRecipeData({ ...recipeData, instructions: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-600">
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              value={recipeData.imageUrl}
              onChange={(e) => setRecipeData({ ...recipeData, imageUrl: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-600">
              Cooking Time
            </label>
            <input
              type="number"
              id="cookingTime"
              value={recipeData.cookingTime || ''}
              onChange={(e) => setRecipeData({ ...recipeData, cookingTime: parseInt(e.target.value, 10) || 0 })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <button className="bg-yellow-600 hover:bg-yellow-500 text-white p-2 rounded-md w-full" type="submit">
            Submit
          </button>
        </form>
      ) : (
        <div className="flex justify-center items-center h-32">
          <h2 className="font-semibold text-2xl mx-3 text-amber-600">Kindly <Link to='/auth' className='underline'>Login</Link> to add recipes</h2>
        </div>
      )}
      {success && <h1 className="text-green-700 text-center mt-4">{success}</h1>}
      {error && <h1 className="text-red-500 text-center mt-4">{error}</h1>}
    </div>
  </div>
);
};

export default Recipe;
