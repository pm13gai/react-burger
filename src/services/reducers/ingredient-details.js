import {
    SET_INGREDIENT_FOR_MODAL,
    REMOVE_INGREDIENT_FOR_MODAL
} from '../actions/ingredient-details';

const initialState = {
    ingredient: null
}

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INGREDIENT_FOR_MODAL: {
            return {
                ...state,
                ingredient: action.ingredient,
            };
        }
        case REMOVE_INGREDIENT_FOR_MODAL: {
            return {
                ...state,
                ingredient: null,
            };
        }
        default: {
            return state
        }
    }
} 