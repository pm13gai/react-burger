import {
    EMAIL_REQUEST,
    EMAIL_REQUEST_FAILED,
    EMAIL_REQUEST_SUCCESS,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    TResetActions
} from '../actions/reset';

export type TResetState = {
    emailRequest: boolean,
    emailFailed: boolean,
    resetEmailSent: boolean,
    passwordChanged: boolean
}

const initialState: TResetState = {
    emailRequest: false,
    emailFailed: false,
    resetEmailSent: false,
    passwordChanged: false,
}

export const resetReducer = (state = initialState, action: TResetActions): TResetState => {
    switch (action.type) {
        case EMAIL_REQUEST: {
            return {
                ...state,
                emailRequest: true,
                emailFailed: false,
            };
        }
        case EMAIL_REQUEST_SUCCESS: {
            return {
                ...state,
                emailRequest: false,
                resetEmailSent: true,
            };
        }
        case EMAIL_REQUEST_FAILED: {
            return {
                ...state,
                emailFailed: true,
                emailRequest: false
            };
        }
        case CHANGE_PASSWORD_REQUEST: {
            return {
                ...state,
                passwordChanged: false,
            };
        }
        case CHANGE_PASSWORD_SUCCESS: {
            return {
                ...state,
                passwordChanged: true,
                resetEmailSent: false
            };
        }
        default: {
            return state
        }
    }
} 