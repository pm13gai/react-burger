import {
    SET_BUN,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    REMOVE_ALL_INGREDIENTS,
    CHANGE_INGREDIENTS_ORDER
} from '../actions/order';

const initialState = {
    bun: null,
    ingredients: [],
    totalPrice: 0
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUN: {
            const bunPrice = state.bun ? state.bun.price : 0;
            return {
                ...state,
                bun: action.bun,
                totalPrice: state.totalPrice - bunPrice * 2 + action.bun.price * 2
            };
        }
        case ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredient],
                totalPrice: state.totalPrice + action.ingredient.price
            };
        }
        case REMOVE_INGREDIENT: {
            return {
                ...state,
                ingredients: state.ingredients.slice(0).filter((el) => el.idForConstructor !== action.ingredient.idForConstructor),
                totalPrice: state.totalPrice - action.ingredient.price
            };
        }
        case REMOVE_ALL_INGREDIENTS: {
            return initialState;
        }

        case CHANGE_INGREDIENTS_ORDER: {
            let sortedIngredients = [...state.ingredients];
            sortedIngredients.splice(action.dragIndex, 1);
            sortedIngredients.splice(action.hoverIndex, 0, state.ingredients[action.dragIndex]);
            return {
                ...state,
                ingredients: sortedIngredients
            };
        }


        default: {
            return state
        }
    }
} 