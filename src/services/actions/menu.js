import { request } from '../../utils/burger-api'

export const GET_INGREDIENTS = "GET_INGREDIENTS"
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED"
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS"
export const SET_INITIAL_COUNT = "SET_INITIAL_COUNT"
export const INCREMENT_INGREDIENT_COUNT = "INCREMENT_INGREDIENT_COUNT"
export const DECREMENT_INGREDIENT_COUNT = "DECREMENT_INGREDIENT_COUNT"


export const getIngredients = () => (dispatch) => {
    dispatch({
        type: GET_INGREDIENTS
    })
    request('ingredients').then(res => {
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