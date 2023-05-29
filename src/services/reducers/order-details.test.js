import {
    orderDetailsReducer as reducer,
    initialState
} from './order-details'
import {
    POST_ORDER,
    POST_ORDER_FAILED,
    POST_ORDER_SUCCESS,
    CLEAR_ORDER_DETAILS,
} from '../actions/order-details';


describe('order-details reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should handle POST_ORDER', () => {

        expect(
            reducer(undefined, {
                type: POST_ORDER,
            })
        ).toEqual({
            ...initialState,
            orderRequest: true,
            orderFailed: false,
        })
    })


    it('should handle POST_ORDER_FAILED', () => {
        expect(
            reducer({
                ...initialState,
                orderFailed: false,
                orderRequest: true
            }, {
                type: POST_ORDER_FAILED,
            })
        ).toEqual({
            ...initialState,
            orderFailed: true,
            orderRequest: false
        })
    })

    it('should handle POST_ORDER_SUCCESS', () => {
        expect(
            reducer({
                ...initialState,
                number: null,
                orderRequest: true
            }, {
                type: POST_ORDER_SUCCESS,
                number: 1234,
            })
        ).toEqual({
            ...initialState,
            number: 1234,
            orderRequest: false
        })
    })
    it('should handle CLEAR_ORDER_DETAILS', () => {
        expect(
            reducer(undefined, {
                type: CLEAR_ORDER_DETAILS,
            })
        ).toEqual(initialState)
    })





})