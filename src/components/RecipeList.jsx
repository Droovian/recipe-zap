import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const token = localStorage.getItem("access_token");
        //  console.log("Token:", token);
        const response = await axios.get('http://localhost:3000/recipes/view-recipes', {
          headers:{
            authorization: `${token}`
          }
        });
        setRecipes(response.data.recipes);
      } catch (error) {
        setError('Cannot view without logging in!');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className=" w-screen h-32 flex justify-center items-center">
        <Link to='/auth' 
        className="text-3xl p-3 text-red-500"
        >{error}</Link>
    </div>;
  }

  return (
    <Grid container spacing={4} className="p-6">
    {recipes.length === 0 ? (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-4xl">
        It looks like everyone orders food online nowadays 😔
      </div>
    ) : null}
      {recipes.map((recipe) => (
        <Grid item key={recipe._id} xs={12} sm={6} md={4} lg={3}>
          <Card className="h-full border-2 border-gray-300 rounded-lg overflow-hidden shadow-md transition duration-500 transform hover:scale-105">
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full h-48 object-cover object-center"
            />
            
            <CardContent className="py-4">
              <Typography
                variant="h6"
                component="div"
                className="text-xl font-semibold text-gray-800 mb-2"
              >
                {recipe.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="mb-2"
              >
                Cooking Time: {recipe.cookingTime} minutes
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="mb-2"
              >
                Ingredients: {recipe.ingredients.join(", ")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Instructions: {recipe.instructions.join(", ")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeList;
