import {
    resetReducer as reducer,
    initialState
} from './reset'
import {
    EMAIL_REQUEST,
    EMAIL_REQUEST_FAILED,
    EMAIL_REQUEST_SUCCESS,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
} from '../actions/reset';


describe('reset reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should handle EMAIL_REQUEST', () => {

        expect(
            reducer({
                ...initialState
            }, {
                type: EMAIL_REQUEST,
            })
        ).toEqual({
            ...initialState,
            emailRequest: true,
            emailFailed: false,
        })
    })


    it('should handle EMAIL_REQUEST_SUCCESS', () => {
        expect(
            reducer({
                ...initialState,
                emailRequest: true,
                resetEmailSent: false,
            }, {
                type: EMAIL_REQUEST_SUCCESS
            })
        ).toEqual({
            ...initialState,
            emailRequest: false,
            resetEmailSent: true,
        })
    })

    it('should handle EMAIL_REQUEST_FAILED', () => {
        expect(
            reducer({
                ...initialState,
                emailFailed: false,
                emailRequest: true
            }, {
                type: EMAIL_REQUEST_FAILED,
            })
        ).toEqual({
            ...initialState,
            emailFailed: true,
            emailRequest: false
        })
    })
    it('should handle CHANGE_PASSWORD_REQUEST', () => {
        expect(
            reducer(undefined, {
                type: CHANGE_PASSWORD_REQUEST
            })
        ).toEqual({
            ...initialState,
            passwordChanged: false,
        })
    })
    it('should handle CHANGE_PASSWORD_SUCCESS', () => {
        expect(
            reducer({
                ...initialState,
                passwordChanged: false,
            }, {
                type: CHANGE_PASSWORD_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            passwordChanged: true,
        })
    })




})