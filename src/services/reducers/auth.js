import {
    AUTH_REQUEST_FAILED,
    AUTH_REQUEST_SUCCESS,
    LOGOUT_REQUEST_SUCCESS
} from '../actions/auth';


const initialState = {
    user: null,
    isAuthChecked: false,
    authFailed: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case AUTH_REQUEST_SUCCESS: {
            return {
                ...state,
                user: action.user,
                isAuthChecked: true,
            };
        }
        case AUTH_REQUEST_FAILED: {
            return {
                ...state,
                authFailed: true,
                isAuthChecked: true
            };
        }
        case LOGOUT_REQUEST_SUCCESS: {
            return {
                ...state,
                user: null,
                isAuthChecked: false
            };
        }
        default: {
            return state
        }
    }
} 