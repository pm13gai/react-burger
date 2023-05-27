import { request } from '../../utils/burger-api'
import { AppDispatch, AppThunkAction } from '../store';


export const EMAIL_REQUEST: 'EMAIL_REQUEST' = "EMAIL_REQUEST"
export const EMAIL_REQUEST_FAILED: 'EMAIL_REQUEST_FAILED' = "EMAIL_REQUEST_FAILED"
export const EMAIL_REQUEST_SUCCESS: 'EMAIL_REQUEST_SUCCESS' = "EMAIL_REQUEST_SUCCESS"

export const CHANGE_PASSWORD_REQUEST: 'CHANGE_PASSWORD_REQUEST' = "CHANGE_PASSWORD_REQUEST"
export const CHANGE_PASSWORD_FAILED: 'CHANGE_PASSWORD_FAILED' = "CHANGE_PASSWORD_FAILED"
export const CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS' = "CHANGE_PASSWORD_SUCCESS"

export interface IEmailRequestAction {
    readonly type: typeof EMAIL_REQUEST;
}
export interface IEmailRequestFailedAction {
    readonly type: typeof EMAIL_REQUEST_FAILED;
}
export interface IEmailRequestSuccessAction {
    readonly type: typeof EMAIL_REQUEST_SUCCESS;
}
export interface IChangePasswordRequestAction {
    readonly type: typeof CHANGE_PASSWORD_REQUEST;
}
export interface IChangePasswordFailedAction {
    readonly type: typeof CHANGE_PASSWORD_FAILED;
}
export interface IChangePasswordSuccessAction {
    readonly type: typeof CHANGE_PASSWORD_SUCCESS;
}
export type TResetActions =
    | IEmailRequestAction
    | IEmailRequestFailedAction
    | IEmailRequestSuccessAction
    | IChangePasswordRequestAction
    | IChangePasswordFailedAction
    | IChangePasswordSuccessAction;

export const emailRequest = (data: any): AppThunkAction => (dispatch: AppDispatch) => {
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
export const changeRasswordRequest = (data: any) => (dispatch: AppDispatch) => {
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
