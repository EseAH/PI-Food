require('dotenv').config()
const axios = require ("axios")
const { API_KEY_1, API_KEY_2, API_KEY_12 } = process.env;
const { Recipe, Diet } = require("../db")

const URL = 'https://api.spoonacular.com/recipes/complexSearch'

const getAllDiets = async () => {
    const totalDiets = await Diet.findAll()
    if (!totalDiets.length) {
        const apiUrl = await axios.get(`${URL}?apiKey=${API_KEY_5}&addRecipeInformation=true&number=100`)
        const apiDiets = apiUrl.data.results?.map(e => e.diets)

        const allDiets = apiDiets.flat().concat("vegetarian", "ketogenic")
        const filterDiets = [...new Set(allDiets)]
        //console.log(filterDiets)
        
        for (const elem in filterDiets) {
            Diet.findOrCreate({
                where: {name: filterDiets[elem]},
            })
        }
    } else {
        return totalDiets
    }
    
}

module.exports = {getAllDiets}