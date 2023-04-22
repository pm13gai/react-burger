import { request } from '../../utils/burger-api'

export const EMAIL_REQUEST = "EMAIL_REQUEST"
export const EMAIL_REQUEST_FAILED = "EMAIL_REQUEST_FAILED"
export const EMAIL_REQUEST_SUCCESS = "EMAIL_REQUEST_SUCCESS"

export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST"
export const CHANGE_PASSWORD_FAILED = "CHANGE_PASSWORD_FAILED"
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS"

export const emailRequest = (data) => (dispatch) => {
    dispatch({
        type: EMAIL_REQUEST
    })
    request('password-reset', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    }).then(res => {
        dispatch({
            type: EMAIL_REQUEST_SUCCESS,
        });

    }).catch(err => {
        dispatch({
            type: EMAIL_REQUEST_FAILED
        })
    })
}
export const changeRasswordRequest = (data) => (dispatch) => {
    dispatch({
        type: CHANGE_PASSWORD_REQUEST
    })
    request('password-reset/reset', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    }).then(res => {
        dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
        });

    }).catch(err => {
        dispatch({
            type: CHANGE_PASSWORD_FAILED
        })
    })
}
