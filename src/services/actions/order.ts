import { IIngredientTypes } from '../../utils/ingredient-type';

export const SET_BUN: 'SET_BUN' = "SET_BUN"
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = "ADD_INGREDIENT"
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = "REMOVE_INGREDIENT"
export const REMOVE_ALL_INGREDIENTS: 'REMOVE_ALL_INGREDIENTS' = "REMOVE_ALL_INGREDIENTS"
export const CHANGE_INGREDIENTS_ORDER: 'CHANGE_INGREDIENTS_ORDER' = "CHANGE_INGREDIENTS_ORDER"

export interface ISetBunAction {
    readonly type: typeof SET_BUN;
    readonly bun: IIngredientTypes;
}
export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly ingredient: IIngredientTypes;
}
export interface IRemoveIngredientAction {
    readonly type: typeof REMOVE_INGREDIENT;
    readonly ingredient: IIngredientTypes;
}
export interface IRemoveAllIngredientsAction {
    readonly type: typeof REMOVE_ALL_INGREDIENTS;
}
export interface IChangeIngredientsOrderAction {
    readonly type: typeof CHANGE_INGREDIENTS_ORDER;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}
export type TOrderActions =
    | ISetBunAction
    | IAddIngredientAction
    | IRemoveIngredientAction
    | IRemoveAllIngredientsAction
    | IChangeIngredientsOrderAction;

export function setBun(options: IIngredientTypes) {
    return { type: SET_BUN, bun: options }
}

export function addIngredient(options: IIngredientTypes) {
    return { type: ADD_INGREDIENT, ingredient: options }
}

export function changeIngredientsOrder(dragIndex: number, hoverIndex: number) {
    return { type: CHANGE_INGREDIENTS_ORDER, dragIndex: dragIndex, hoverIndex: hoverIndex }
}