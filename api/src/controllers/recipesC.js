require("dotenv").config();
const axios = require("axios");
const {
  API_KEY_1,
  API_KEY_2,
  API_KEY_3,
  API_KEY_4,
  API_KEY_5,
  API_KEY_6,
  API_KEY_7,
  API_KEY_8,
  API_KEY_9,
  API_KEY_10,
  API_KEY_11,
  API_KEY_12
} = process.env;
const { Recipe, Diet } = require("../db");

const URL = "https://api.spoonacular.com/recipes/complexSearch";

const getAllRecipes = async () => {
  const apiList = await axios.get(
    `${URL}?apiKey=${API_KEY_7}&addRecipeInformation=true&number=100`
  );
  const apiRecipes = apiList.data?.results.map((e) => {
    return {
      id: e.id,
      title: e.title,
      diets: e.diets,
      summary: e.summary.replace(/<[^>]*>?/g, ""),
      healthScore: e.healthScore,
      steps: e.analyzedInstructions[0]?.steps.map((e) => e.step),
      image: e.image,
      dishTypes: e.dishTypes
    };
  });
  //console.log(apiRecipes);

  const dbRecipes = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const dbRecipesMapeadas = dbRecipes.map((e) => {
    return {
      id: e.id,
      title: e.title,
      diets: e.diets.map((e) => e.name),
      summary: e.summary,
      healthScore: e.healthScore,
      steps: e.steps,
      image: e.image,
      dishTypes: e.dishTypes
    }
  })

  return [...apiRecipes, ...dbRecipesMapeadas];
};


const getRecipeId = async (id) => {
  const recipes = await getAllRecipes();
  if (id) {
    let recipeId = recipes.filter((e) => e.id == id);
    return recipeId;
  } else {
    return recipes;
  }
};

const createRecipe = async (req, res) => {
  const { title, summary, healthScore, steps, image, diets } = req.body;
  try {
    // if (title) {
    //   const allRecipes = await getAllRecipes();
    //   const titleMatch = allRecipes.filter((e) => e.title.toLowerCase() === title.toLowerCase());
      // if (!titleMatch.length) {
        const newRecipe = await Recipe.create({
          title,
          summary,
          healthScore,
          steps,
          image,
        });
        const dietsRecipe = await Diet.findAll({
          where: { name: diets },
        });
        newRecipe.addDiet(dietsRecipe);
        console.log(newRecipe)
        return res.status(201).send(newRecipe);
      //} else {
      //   return res.status(404).send("Recipe's title already exist!");
      // }
    //}
  } catch (error) {
    console.log(error + "error ruta");
  }
};

module.exports = { getAllRecipes, getRecipeId, createRecipe };
