import { IIngredientTypes } from "../../utils/ingredient-type";

export const SET_INGREDIENT_FOR_MODAL: 'SET_INGREDIENT_FOR_MODAL' = "SET_INGREDIENT_FOR_MODAL"
export const REMOVE_INGREDIENT_FOR_MODAL: 'REMOVE_INGREDIENT_FOR_MODAL' = "REMOVE_INGREDIENT_FOR_MODAL"

export interface ISetIngredientForModalAction {
    readonly type: typeof SET_INGREDIENT_FOR_MODAL;
    readonly ingredient: IIngredientTypes
}
export interface IRemoveIngredientForModalAction {
    readonly type: typeof REMOVE_INGREDIENT_FOR_MODAL;
}
export type TIngredientDetailsActions =
    | ISetIngredientForModalAction
    | IRemoveIngredientForModalAction;