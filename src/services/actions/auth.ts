import { request } from '../../utils/burger-api'
import { deleteCookie, setCookie, getCookie } from '../../utils/utils';
import { AppDispatch, AppThunkAction } from '../store';
import { ILoginRequestData, IRegisterRequestData, IUser } from '../types/auth';


export const AUTH_REQUEST_FAILED: 'AUTH_REQUEST_FAILED' = "AUTH_REQUEST_FAILED"
export const AUTH_REQUEST_SUCCESS: 'AUTH_REQUEST_SUCCESS' = "AUTH_REQUEST_SUCCESS"
export const LOGOUT_REQUEST_SUCCESS: 'LOGOUT_REQUEST_SUCCESS' = "LOGOUT_REQUEST_SUCCESS"

export interface IAuthRequestFailedAction {
    readonly type: typeof AUTH_REQUEST_FAILED;
}
export interface IAuthRequestSuccessAction {
    readonly type: typeof AUTH_REQUEST_SUCCESS;
    readonly user: IUser;
}
export interface ILogoutRequestSuccessAction {
    readonly type: typeof LOGOUT_REQUEST_SUCCESS;
}

export type TAuthActions =
    | IAuthRequestFailedAction
    | IAuthRequestSuccessAction
    | ILogoutRequestSuccessAction;

export const registerRequest = (data: IRegisterRequestData): AppThunkAction => (dispatch: AppDispatch) => {

    request('auth/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    }).then(res => {
        dispatch({
            type: AUTH_REQUEST_SUCCESS,
            user: res.user
        });

        let authToken = res.accessToken.split('Bearer ')[1];
        if (authToken) {
            setCookie('token', authToken);
        }
        setCookie('refreshToken', res.refreshToken);
    }).catch(err => {
        dispatch({
            type: AUTH_REQUEST_FAILED
        })
    })
}

export const loginRequest = (data: ILoginRequestData): AppThunkAction => (dispatch: AppDispatch) => {

    request('auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    }).then(res => {
        dispatch({
            type: AUTH_REQUEST_SUCCESS,
            user: res.user
        });

        let authToken = res.accessToken.split('Bearer ')[1];
        if (authToken) {
            setCookie('token', authToken);
        }
        setCookie('refreshToken', res.refreshToken);
    }).catch(err => {
        dispatch({
            type: AUTH_REQUEST_FAILED
        })
    })
}

export const getUser = (): AppThunkAction => (dispatch: AppDispatch) => {

    request('auth/user', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: 'Bearer ' + getCookie('token')
        }
    }).then(res => {
        dispatch({
            type: AUTH_REQUEST_SUCCESS,
            user: res.user
        });
    }).catch(err => {
        dispatch({
            type: AUTH_REQUEST_FAILED
        });
        deleteCookie('token');
        deleteCookie('refreshToken');
    })
}

export const checkUserAuth = (): AppThunkAction => (dispatch: AppDispatch) => {
    if (getCookie('token')) {
        dispatch(getUser());
    } else {
        dispatch({
            type: AUTH_REQUEST_FAILED
        })
    }

};

export const patchUser = (data: IRegisterRequestData): AppThunkAction => (dispatch: AppDispatch) => {

    request('auth/user', {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: 'Bearer ' + getCookie('token')
        },
        body: JSON.stringify(data)
    }).then(res => {
        dispatch({
            type: AUTH_REQUEST_SUCCESS,
            user: res.user
        });
    }).catch(err => {
        dispatch({
            type: AUTH_REQUEST_FAILED
        });
    })
}

export const logoutRequest = (): AppThunkAction => (dispatch: AppDispatch) => {

    request('auth/logout', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ token: getCookie('refreshToken') })
    }).then(res => {
        dispatch({
            type: LOGOUT_REQUEST_SUCCESS,
        });
        deleteCookie('token');
        deleteCookie('refreshToken');
    });
}




