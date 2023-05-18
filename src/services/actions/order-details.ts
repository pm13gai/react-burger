import { request } from '../../utils/burger-api'
import { REMOVE_ALL_INGREDIENTS } from './order';
import { SET_INITIAL_COUNT } from './menu';
import { getCookie } from '../../utils/utils';
import { AppDispatch, AppThunkAction } from '../store';

export const POST_ORDER: 'POST_ORDER' = "POST_ORDER"
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = "POST_ORDER_FAILED"
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = "POST_ORDER_SUCCESS"
export const CLEAR_ORDER_DETAILS: 'CLEAR_ORDER_DETAILS' = "CLEAR_ORDER_DETAILS"

export interface IPostOrderAction {
    readonly type: typeof POST_ORDER;
}
export interface IPostOrderFailedAction {
    readonly type: typeof POST_ORDER_FAILED;
}
export interface IPostOrderSuccessAction {
    readonly type: typeof POST_ORDER_SUCCESS;
    readonly number: number;
}
export interface IClearOrderDetailsAction {
    readonly type: typeof CLEAR_ORDER_DETAILS;
}
export type TOrderDetailsActions =
    | IPostOrderAction
    | IPostOrderFailedAction
    | IPostOrderSuccessAction
    | IClearOrderDetailsAction;

export const postIngredients = (order: {ingredients: Array<any>}): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({
        type: POST_ORDER
    })
    request('orders', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: 'Bearer ' + getCookie('token')
        },
        body: JSON.stringify(order)
    }).then(res => {
        dispatch({
            type: POST_ORDER_SUCCESS,
            number: res.order.number
        });
        dispatch({ type: REMOVE_ALL_INGREDIENTS });
        dispatch({ type: SET_INITIAL_COUNT });
    }).catch(err => {
        dispatch({
            type: POST_ORDER_FAILED
        })
    })
}

