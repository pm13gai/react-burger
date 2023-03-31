export const SET_BUN = "SET_BUN"
export const ADD_INGREDIENT = "ADD_INGREDIENT"
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT"
export const REMOVE_ALL_INGREDIENTS = "REMOVE_ALL_INGREDIENTS"
export const CHANGE_INGREDIENTS_ORDER = "CHANGE_INGREDIENTS_ORDER"


export function setBun(options) {
    return { type: SET_BUN, bun: options }
}

export function addIngredient(options) {
    return { type: ADD_INGREDIENT, ingredient: options }
}

export function changeIngredientsOrder(dragIndex, hoverIndex) {
    return { type: CHANGE_INGREDIENTS_ORDER, dragIndex: dragIndex, hoverIndex: hoverIndex }
}