import {
    GET_RECIPES, GET_RECIPE_TITLE
} from "./actions"

const initialState = {
    recipes: [],
    detail: [],
    diets: [],
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
            }
        case GET_RECIPE_TITLE:
            return {
                ...state,
                recipes: action.payload,
            };
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload,
            };
        
        
        default:
            return state;
    }
}