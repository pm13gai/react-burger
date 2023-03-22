import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    SET_INITIAL_COUNT,
    INCREMENT_INGREDIENT_COUNT,
    DECREMENT_INGREDIENT_COUNT
} from '../actions/menu';



const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: []
}

export const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsRequest: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false
            };
        }

        case SET_INITIAL_COUNT: {
            return {
                ...state,
                ingredients: state.ingredients.map(el => (action.bun._id === el._id ? { ...el, count: 2 } : { ...el, count: 0 })),
            };
        }

        case INCREMENT_INGREDIENT_COUNT: {
            return {
                ...state,
                ingredients: state.ingredients.map(el => {
                    if (action.ingredient.type === 'bun' && el.type === 'bun') {
                        return el._id === action.ingredient._id ? { ...el, count: 2 } : { ...el, count: 0 }
                    } else if (el._id === action.ingredient._id) {
                        return { ...el, count: el.count + 1 }
                    }
                    return el;
                }),
            };
        }
        case DECREMENT_INGREDIENT_COUNT: {
            return {
                ...state,
                ingredients: state.ingredients.map(el => {
                    return el._id === action.ingredient._id ? { ...el, count: el.count - 1 } : el
                }),
            };
        }

        default: {
            return state
        }
    }
} 