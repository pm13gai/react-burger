import { request } from '../../utils/burger-api'
import { AppDispatch, AppThunkAction } from '../store';
import { IIngredientTypes } from '../../utils/ingredient-type';

export const GET_INGREDIENTS: 'GET_INGREDIENTS' = "GET_INGREDIENTS"
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = "GET_INGREDIENTS_FAILED"
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = "GET_INGREDIENTS_SUCCESS"
export const SET_INITIAL_COUNT: 'SET_INITIAL_COUNT' = "SET_INITIAL_COUNT"
export const INCREMENT_INGREDIENT_COUNT: 'INCREMENT_INGREDIENT_COUNT' = "INCREMENT_INGREDIENT_COUNT"
export const DECREMENT_INGREDIENT_COUNT: 'DECREMENT_INGREDIENT_COUNT' = "DECREMENT_INGREDIENT_COUNT"

export interface IGetIngredientsAction {
    readonly type: typeof GET_INGREDIENTS;
}
export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: ReadonlyArray<IIngredientTypes>;
}
export interface ISetInitialCountAction {
    readonly type: typeof SET_INITIAL_COUNT;
}
export interface IIncrementIngredientAction {
    readonly type: typeof INCREMENT_INGREDIENT_COUNT;
    readonly ingredient: IIngredientTypes;
}
export interface IDecrementIngredientAction {
    readonly type: typeof DECREMENT_INGREDIENT_COUNT;
    readonly ingredient: IIngredientTypes;
}

export type TMenuActions =
    | IGetIngredientsAction
    | IGetIngredientsFailedAction
    | IGetIngredientsSuccessAction
    | ISetInitialCountAction
    | IIncrementIngredientAction
    | IDecrementIngredientAction;

export const getIngredients = (): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({
        type: GET_INGREDIENTS
    })
    request('ingredients', null).then(res => {
        dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data
        });
        dispatch({
            type: SET_INITIAL_COUNT
        });

    }).catch(err => {
        dispatch({
            type: GET_INGREDIENTS_FAILED
        })
    })
}