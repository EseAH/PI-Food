import {
    BY_DIET,
    CLEAN_DETAIL,
    CREATE_RECIPE,
    GET_DETAIL,
    GET_DIETS,
    GET_RECIPES,
    GET_RECIPE_TITLE,
    ORDER_AZ
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
        case ORDER_AZ:
            const allRecipes = state.recipes
            let sortedTitle = action.payload === "a-z" ?
                allRecipes.sort((a, b) => {
                    if (a.title > b.title) return 1  
                    if (a.title < b.title) return -1  
                    return 0
                }) :
                allRecipes.sort((b, a) => {
                    if (a.title > b.title) return 1  
                    if (a.title < b.title) return -1  
                    return 0
                })
            return {
                ...state,
                recipes: sortedTitle
            }
        case BY_DIET:
            const dietFilter = action.payload === "all" ? allRecipes :
            allRecipes.filter(r => r.diet === action.payload)
            return {
                ...state,
                recipes: dietFilter
            }
            
        default:
            return state;
    }
}

export default rootReducer