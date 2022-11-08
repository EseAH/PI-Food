import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_TITLE = "GET_RECIPE_TITLE";
export const GET_DETAIL = "GET_DETAIL";
export const GET_DIETS = "GET_DIETS";
export const CREATE_RECIPE = "CREATE_RECIPE"
export const CLEAN_DETAIL = "CLEAN_DETAIL"

export function getRecipes(){
    return async function(dispatch){
        try {
            let json = await axios.get("http://localhost:3001/recipes")
            //console.log(json.data)
            return dispatch({
                type: GET_RECIPES,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getRecipeTitle(title){
    return async function(dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/recipes?title=${title}`)
            return dispatch ({
                type: GET_RECIPE_TITLE,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDetail(id){
    return async function(dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/recipes/${id}`)
            //console.log(json)
            return dispatch ({
                type: GET_DETAIL,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function cleanDetail() {
    return { type: CLEAN_DETAIL }
}

export function getDiets() {
    return async function(dispatch){
        try {
            let json = await axios("http://localhost:3001/diets")
            //console.log(json)
            return dispatch({
                type: GET_DIETS,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postRecipe(payload){
    return async function (dispatch){
        const response = await axios.post("http://localhost:3001/recipes", payload)
        return response
    }
}

