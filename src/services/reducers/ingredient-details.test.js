import {
    ingredientDetailsReducer as reducer,
    initialState
} from './ingredient-details'
import {
    SET_INGREDIENT_FOR_MODAL,
    REMOVE_INGREDIENT_FOR_MODAL,
} from '../actions/ingredient-details';

const testIngredient = {
    "_id": "643d69a5c3f7b9001cfa093c",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
}

describe('ingredient-details reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })


    it('should handle SET_INGREDIENT_FOR_MODAL', () => {

        expect(
            reducer(undefined, {
                type: SET_INGREDIENT_FOR_MODAL,
                ingredient: testIngredient
            })
        ).toEqual({
            ingredient: testIngredient,
        })
    })

    it('should handle REMOVE_INGREDIENT_FOR_MODAL', () => {

        expect(
            reducer({
                ingredient: testIngredient
            }, {
                type: REMOVE_INGREDIENT_FOR_MODAL,
            })
        ).toEqual({
            ...initialState,
        })
    })


})