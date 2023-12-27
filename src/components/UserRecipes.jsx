import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const UserRecipes = () => {

    const [individualRecipes, setIndividualRecipes] = useState([]);
    const [error, setError] = useState(null);

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
        <div>
            <div className="container mx-auto mt-8">
            <h2 className="text-3xl font-semibold mb-4">Your Recipes</h2>

            {error ? (
                <div className="text-red-500 text-lg">{error}</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {individualRecipes.map((recipe) => (
                        <div key={recipe._id} className="bg-white p-4 rounded-md shadow-md">
                            <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                            <p className="text-gray-600 mb-2">Cooking Time: {recipe.cookingTime} minutes</p>
                            <p className="text-gray-600 mb-2">Ingredients: {recipe.ingredients.join(", ")}</p>
                            <p className="text-gray-600 mb-2">Instructions: {recipe.instructions.join(", ")}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
     );
}
 
export default UserRecipes;