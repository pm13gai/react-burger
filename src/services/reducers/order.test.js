import {
    orderReducer as reducer,
    initialState
} from './order'
import {
    SET_BUN,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    REMOVE_ALL_INGREDIENTS,
    CHANGE_INGREDIENTS_ORDER,
} from '../actions/order';

import * as ingredientsData from '../../../cypress/fixtures/ingredients.json'

describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should handle SET_BUN', () => {

        expect(
            reducer({
                ...initialState,
                bun: null,
                totalPrice: 0
            }, {
                type: SET_BUN,
                bun: ingredientsData.data[0],
            })
        ).toEqual({
            ...initialState,
            bun: ingredientsData.data[0],
            totalPrice: ingredientsData.data[0].price * 2
        })
    })


    it('should handle ADD_INGREDIENT', () => {
        expect(
            reducer({
                ...initialState,
                ingredients: [],
                totalPrice: 0
            }, {
                type: ADD_INGREDIENT,
                ingredient: ingredientsData.data[1]
            })
        ).toEqual({
            ...initialState,
            ingredients: [ingredientsData.data[1]],
            totalPrice: ingredientsData.data[1].price
        })
    })

    it('should handle REMOVE_INGREDIENT', () => {
        expect(
            reducer({
                ...initialState,
                ingredients: [ingredientsData.data[1]],
                totalPrice: ingredientsData.data[1].price
            }, {
                type: REMOVE_INGREDIENT,
                ingredient: ingredientsData.data[1]
            })
        ).toEqual({
            ...initialState,
            ingredients: [],
            totalPrice: 0
        })
    })
    it('should handle REMOVE_ALL_INGREDIENTS', () => {
        expect(
            reducer({
                ...initialState,
                ingredients: [ingredientsData.data[1]],
                totalPrice: ingredientsData.data[1].price
            }, {
                type: REMOVE_ALL_INGREDIENTS
            })
        ).toEqual(initialState)
    })
    it('should handle CHANGE_INGREDIENTS_ORDER', () => {
        expect(
            reducer({
                ...initialState,
                ingredients: [ingredientsData.data[1], ingredientsData.data[2]],
            }, {
                type: CHANGE_INGREDIENTS_ORDER,
                dragIndex: 0,
                hoverIndex: 1
            })
        ).toEqual({
            ...initialState,
            ingredients: [ingredientsData.data[2], ingredientsData.data[1]],
        })
    })




})