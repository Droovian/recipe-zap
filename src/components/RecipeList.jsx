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
    <Grid container spacing={2}>
      {recipes.map((recipe) => (
        <Grid item key={recipe._id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {recipe.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cooking Time: {recipe.cookingTime} minutes
              </Typography>
              <Typography variant="body2" color="text.secondary">
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
