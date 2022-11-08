import {
    CLEAN_DETAIL,
    CREATE_RECIPE,
    GET_DETAIL,
    GET_DIETS,
    GET_RECIPES,
    GET_RECIPE_TITLE
} from "./actions"

const initialState = {
    recipes: [],
    detail: [],
    diets: [],
}

const rootReducer = (state = initialState, action) => {
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
        case CLEAN_DETAIL:
            return {
                ...state,
                detail: [],
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload,
            };
        case CREATE_RECIPE:
            return {
                ...state,
            };
            
        default:
            return state;
    }
}

export default rootReducer