import {
    authReducer as reducer,
    initialState
} from './auth'
import {
    AUTH_REQUEST_FAILED,
    AUTH_REQUEST_SUCCESS,
    LOGOUT_REQUEST_SUCCESS
} from '../actions/auth';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should handle AUTH_REQUEST_FAILED', () => {

        expect(
            reducer({
                user: null,
                isAuthChecked: false,
                authFailed: false,
            }, {
                type: AUTH_REQUEST_FAILED,
            })
        ).toEqual({
            ...initialState,
            authFailed: true,
            isAuthChecked: true
        })
    })

    it('should handle AUTH_REQUEST_SUCCESS', () => {

        expect(
            reducer({
                user: null,
                isAuthChecked: false,
                authFailed: false,
            }, {
                type: AUTH_REQUEST_SUCCESS,
                user: {
                    email: 'testuser@testuser.testuser',
                    name: 'testuser'
                }
            })
        ).toEqual({

            ...initialState,
            user: {
                email: 'testuser@testuser.testuser',
                name: 'testuser'
            },
            isAuthChecked: true,
        })
    })

    it('should handle LOGOUT_REQUEST_SUCCESS', () => {

        expect(
            reducer({
                user: {
                    email: 'testuser@testuser.testuser',
                    name: 'testuser'
                },
                isAuthChecked: true,
                authFailed: false,
            }, {
                type: LOGOUT_REQUEST_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            user: null,
            isAuthChecked: false
        })
    })




})