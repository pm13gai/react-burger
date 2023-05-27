import { IIngredientTypes } from '../../utils/ingredient-type';
import {
    SET_INGREDIENT_FOR_MODAL,
    REMOVE_INGREDIENT_FOR_MODAL,
    TIngredientDetailsActions
} from '../actions/ingredient-details';

export type TIngredientDetailsState = {
    ingredient: IIngredientTypes | null;
};

const initialState: TIngredientDetailsState = {
    ingredient: null
}

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions): TIngredientDetailsState => {
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