import { request } from '../../utils/burger-api'
import { deleteCookie, setCookie, getCookie } from '../../utils/utils';


export const AUTH_REQUEST_FAILED = "AUTH_REQUEST_FAILED"
export const AUTH_REQUEST_SUCCESS = "AUTH_REQUEST_SUCCESS"
export const LOGOUT_REQUEST_SUCCESS = "LOGOUT_REQUEST_SUCCESS"




export const registerRequest = (data) => (dispatch) => {

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

export const loginRequest = (data) => (dispatch) => {

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

export const getUser = () => (dispatch) => {

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

export const checkUserAuth = () => (dispatch) => {
    if (getCookie('token')) {
        dispatch(getUser());
    } else {
        dispatch({
            type: AUTH_REQUEST_FAILED
        })
    }

};

export const patchUser = (data) => (dispatch) => {

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

export const logoutRequest = () => (dispatch) => {

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




