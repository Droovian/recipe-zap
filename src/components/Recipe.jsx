import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const Recipe = () => {
  const [recipeData, setRecipeData] = useState({
    name: '',
    ingredients: [],
    instructions: "",
    imageUrl: '',
    cookingTime: 0,
    userOwner: 0,
  });


  const handleSubmit = () => {
    setRecipeData({...recipe, ingredients: [...recipe.ingredients, ""]})
  }

  const handleChange = (event) => {
      const { name, value } = event.target;

      setRecipeData({...recipe, [name]:value});
  }

  return (
    <div className='w-full h-screen'>
    <div className='flex justify-center'>
        <h1 className='p-3 m-3 text-2xl'>Add Recipes</h1>
    </div>
    <div className="flex justify-center">
      <form className="w-full max-w-md">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6">
            <label htmlFor="name" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Recipe Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              required
            />
          </div>
          <div className="w-full px-3 mb-6">
            <label htmlFor="ingredients" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Ingredients
            </label>
            <input
              type="text"
              id="ingredients"
              name="ingredients"
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              required
            />
          </div>
          <div className="w-full px-3 mb-6">
            <label htmlFor="instructions" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Instructions (comma-separated)
            </label>
            <input
              type="text"
              id="instructions"
              name="instructions"
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              required
            />
          </div>
          <div className="w-full px-3 mb-6">
            <label htmlFor="imageUrl" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              required
            />
          </div>
          <div className="w-full px-3 mb-6">
            <label htmlFor="cookingTime" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Cooking Time (in minutes)
            </label>
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              required
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Recipe;
