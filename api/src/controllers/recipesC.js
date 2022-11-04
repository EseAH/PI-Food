require('dotenv').config()
const axios = require ("axios")
const { API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5, } = process.env;
const { Recipe, Diet } = require("../db")

const URL = 'https://api.spoonacular.com/recipes/complexSearch'


const getAllRecipes = async () => {
    const apiList = await axios.get(`${URL}?apiKey=${API_KEY_4}&addRecipeInformation=true&number=100`)
    const apiRecipes = apiList.data?.results.map((e) => {
        return {
                id: e.id,
                title: e.title,
                diets: e.diets,
                summary: e.summary.replace(/<[^>]*>?/g, ""),
                healthScore: e.healthScore,
                steps: e.analyzedInstructions[0]?.steps.map((e) => e.step),
                image: e.image,
        }
    })
    //console.log(apiRecipes);
    // if (apiRecipes.length > 10) {            //llenar BD
    //     return await Recipe.bulkCreate(apiRecipes)  //
    // }

    const dbRecipes = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
    })

    return [...apiRecipes, ...dbRecipes]
}

// const getAllRecipes = async () => {
//     try {
//         const apiList = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_1}&addRecipeInformation=true&number=10`)
//         const apiRecipes = await apiList.data?.results.map((e) => {
//             return {
//                 id: e.id,
//                 title: e.title,
//                 diets: e.diets,
//                 summary: e.summary.replace(/<[^>]*>?/g, ""),
//                 healthScore: e.healthScore,
//                 steps: e.analyzedInstructions[0]?.steps.map((e) => e.step),
//                 image: e.image,
//             }
//         })
//         console.log(apiRecipes);
//         return apiRecipes
//     } catch (error) {
//         console.log('error en controller');
//     }
// }

const getRecipeId = async (id) => {
    const recipes = await getAllRecipes()
    if (id) {
        let recipeId = recipes.filter(e => e.id == id)
        return recipeId
    } else {
        return recipes
    }
}

const createRecipe = async (req, res, next) => {
    const { title, summary, healthScore, steps, image, diets } = req.body

    if (!title || !summary) return res.status(404).send("Missing fields")
    try {
        if (title) {
            const allRecipes = await getAllRecipes()
            const titleMatch = allRecipes.filter(e => e.title.toLowerCase() === title.toLowerCase())
            if (!titleMatch.length) {
                const newRecipe = await Recipe.create({
                    title: title.charAt(0).toUpperCase() + title.slice(1).toLowerCase(),
                    summary,
                    healthScore,
                    steps,
                    image,
                })
                const dietsRecipe = await Diet.findAll({
                    where: { name: diets},
                })
                newRecipe.addDiet(dietsRecipe)
                return res.status(201).send(newRecipe)
            } else {
                return res.status(404).send("Recipe's title already exist!")
            }
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {getAllRecipes, getRecipeId, createRecipe}