import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const UserRecipes = () => {

    const [individualRecipes, setIndividualRecipes] = useState([]);
    const [cookies, setCookies] = useCookies(["access_token"]);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("access_token");

    const handleDelete = async (recipeId) => {
        try {
          await axios.delete(`http://localhost:3000/recipes/delete/${recipeId}`, {
            headers: {
              Authorization: `${token}`
            }
          });
      
          // Since the deletion was successful, fetch the updated user recipes
          const response = await axios.get('http://localhost:3000/recipes/own-recipes', {
            headers: {
              Authorization: `${token}`
            }
          });
      
          setIndividualRecipes(response.data.userRecipes);
        } catch (error) {
          console.error('Error deleting recipe:', error);
          if (error.response && error.response.status === 404) {
            // Handle 404 error (Recipe not found) separately if needed
            setError('Recipe not found.');
          } else {
            // Handle other errors
            setError('Sorry, something went wrong while deleting the recipe.');
          }
        }
      };
      
    useEffect(() => {

        const individualData = async () => {

            try {   
                const token = localStorage.getItem("access_token");
                // console.log(token);
                const response = await axios.get('http://localhost:3000/recipes/own-recipes', {
                    headers: {
                        authorization: `${token}`
                    }
                });

                setIndividualRecipes(response.data.userRecipes);
            }
            catch(error){
                setError('Sorry, you do not have any recipes posted.');
            }
        }

        individualData();
    }, []);
    return ( 
          <div className="container mx-auto mt-8">
          <h2 className="text-3xl font-semibold mb-4 p-3">Your Recipes</h2>

          {error || !cookies.access_token ? (
              <div className="mx-3 text-red-500 text-lg">{error || 'You are not logged in.'}</div>
          ) : individualRecipes.length === 0 ? (
              <div className="mx-3 text-gray-500 text-lg">You do not have any recipes posted.</div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {individualRecipes.map((recipe) => (
                      <div key={recipe._id} className="bg-black p-4 rounded-md shadow-md">
                          <h3 className="text-gray-100 text-xl font-semibold mb-2 underline">{recipe.name}</h3>
                          <img
                              src={recipe.imageUrl}
                              alt="recipe"
                              className="mx-auto w-full h-48 object-cover mb-4 rounded-md"
                          />
                          <p className="text-gray-200 mb-2">Cooking Time: {recipe.cookingTime} minutes</p>
                          <p className="text-gray-200 mb-2">Ingredients: {recipe.ingredients.join(", ")}</p>
                          <p className="text-gray-200 mb-2">Instructions: {recipe.instructions.join(", ")}</p>
                          <button
                              onClick={() => {
                                  handleDelete(recipe._id);
                              }}
                              className="bg-red-700 text-white px-3 py-2 rounded-md hover:bg-red-500"
                          >
                              Delete
                          </button>
                      </div>
                  ))}
              </div>
          )}
      </div>
    );
}
 
export default UserRecipes;