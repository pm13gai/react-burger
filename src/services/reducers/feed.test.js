import {
    feedReducer as reducer,
    initialState
} from './feed'
import {
    wsOpen,
    wsClose,
    wsMessage,
    wsError,
    wsConnecting
} from "../actions/feed";
import {
    WebsocketStatus
} from '../types/feed';

import * as orderInfoData from '../../../cypress/fixtures/orders-info.json'


describe('feed reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should handle wsConnecting', () => {

        expect(
            reducer({
                ...initialState,
                status: WebsocketStatus.OFFLINE
            }, {
                type: wsConnecting,
            })
        ).toEqual({
            ...initialState,
            status: WebsocketStatus.CONNECTING
        })
    })

    it('should handle wsOpen', () => {

        expect(
            reducer(undefined, {
                type: wsOpen
            })
        ).toEqual({

            ...initialState,
            status: WebsocketStatus.ONLINE,
            connectionError: ''
        })
    })

    it('should handle wsClose', () => {

        expect(
            reducer(undefined, {
                type: wsClose
            })
        ).toEqual({

            ...initialState,
            status: WebsocketStatus.OFFLINE,
        })
    })
    it('should handle wsError', () => {

        expect(
            reducer(undefined, {
                type: wsError,
                payload: 'error'
            })
        ).toEqual({
            ...initialState,
            connectionError: 'error'
        })
    })

    it('should handle wsMessage', () => {

        expect(
            reducer(undefined, {
                type: wsMessage,
                payload: {
                    orders: [orderInfoData],
                    total: 1,
                    totalToday: 1
                }
            })
        ).toEqual({
            ...initialState,
            orders: [orderInfoData],
            total: 1,
            totalToday: 1
        })
    })




})