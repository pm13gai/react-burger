import {
    orderInfoReducer as reducer,
    initialState
} from './order-info'
import {
    GET_ORDER_INFO,
    GET_ORDER_INFO_FAILED,
    GET_ORDER_INFO_SUCCESS,
} from '../actions/order-info';

import * as orderInfoData from '../../../cypress/fixtures/orders-info.json'

describe('order-info reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should handle GET_ORDER_INFO', () => {

        expect(
            reducer(undefined, {
                type: GET_ORDER_INFO,
            })
        ).toEqual({
            ...initialState,
            requestOrderInfoFailed: false,
        })
    })


    it('should handle GET_ORDER_INFO_FAILED', () => {
        expect(
            reducer({
                ...initialState,
                requestOrderInfoFailed: false
            }, {
                type: GET_ORDER_INFO_FAILED,
            })
        ).toEqual({
            ...initialState,
            requestOrderInfoFailed: true
        })
    })

    it('should handle GET_ORDER_INFO_SUCCESS', () => {
        expect(
            reducer({
                ...initialState,
                order: null
            }, {
                type: GET_ORDER_INFO_SUCCESS,
                order: orderInfoData
            })
        ).toEqual({
            ...initialState,
            order: orderInfoData
        })
    })




})