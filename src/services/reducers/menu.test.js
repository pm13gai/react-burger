import {
    menuReducer as reducer,
    initialState
} from './menu'
import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    SET_INITIAL_COUNT,
    INCREMENT_INGREDIENT_COUNT,
    DECREMENT_INGREDIENT_COUNT,
} from '../actions/menu';

import * as ingredientsData from '../../../cypress/fixtures/ingredients.json'

describe('menu reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should handle GET_INGREDIENTS', () => {

        expect(
            reducer(undefined, {
                type: GET_INGREDIENTS,
            })
        ).toEqual({
            ...initialState,
            ingredientsRequest: true,
            ingredientsFailed: false,
        })
    })


    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            reducer({
                ...initialState,
                ingredients: [],
                ingredientsRequest: true,
            }, {
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: ingredientsData.data
            })
        ).toEqual({
            ...initialState,
            ingredients: ingredientsData.data,
            ingredientsRequest: false
        })
    })
    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(
            reducer({
                ...initialState,
                ingredientsFailed: false,
                ingredientsRequest: true
            }, {
                type: GET_INGREDIENTS_FAILED,
            })
        ).toEqual({
            ...initialState,
            ingredientsFailed: true,
            ingredientsRequest: false
        })
    })
    it('should handle SET_INITIAL_COUNT', () => {
        expect(
            reducer({
                ...initialState,
                ingredients: ingredientsData.data
            }, {
                type: SET_INITIAL_COUNT,
            })
        ).toEqual({
            ...initialState,
            ingredients: ingredientsData.data.map(el => ({
                ...el,
                count: 0
            })),
        })
    })
    it('should handle INCREMENT_INGREDIENT_COUNT', () => {
        expect(
            reducer({
                ...initialState,
                ingredients: ingredientsData.data.map(el => ({
                    ...el,
                    count: 0
                })),
            }, {
                type: INCREMENT_INGREDIENT_COUNT,
                ingredient: ingredientsData.data[1]
            })
        ).toEqual({
            ...initialState,
            ingredients: ingredientsData.data.map((el, i) => (i === 1 ? {
                ...el,
                count: 1
            } : {
                ...el,
                count: 0
            })),
        })
    })
    it('should handle DECREMENT_INGREDIENT_COUNT', () => {
        expect(
            reducer({
                ...initialState,
                ingredients: ingredientsData.data.map((el, i) => (i === 1 ? {
                    ...el,
                    count: 1
                } : {
                    ...el,
                    count: 0
                })),

            }, {
                type: DECREMENT_INGREDIENT_COUNT,
                ingredient: ingredientsData.data[1]
            })
        ).toEqual({
            ...initialState,
            ingredients: ingredientsData.data.map(el => ({
                ...el,
                count: 0
            })),
        })
    })




})