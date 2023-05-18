import { request } from '../../utils/burger-api'
import { AppDispatch, AppThunkAction } from '../store';
import { IOrderData } from '../types/feed';

export const GET_ORDER_INFO: 'GET_ORDER_INFO' = "GET_ORDER_INFO"
export const GET_ORDER_INFO_FAILED: 'GET_ORDER_INFO_FAILED' = "GET_ORDER_INFO_FAILED"
export const GET_ORDER_INFO_SUCCESS: 'GET_ORDER_INFO_SUCCESS' = "GET_ORDER_INFO_SUCCESS"


export interface IGetOrderInfoAction {
    readonly type: typeof GET_ORDER_INFO;
}
export interface IGetOrderInfoFailedAction {
    readonly type: typeof GET_ORDER_INFO_FAILED;
}
export interface IGetOrderInfoSuccessAction {
    readonly type: typeof GET_ORDER_INFO_SUCCESS;
    readonly order: IOrderData;
}


export type TOrderInfoActions =
    | IGetOrderInfoAction
    | IGetOrderInfoFailedAction
    | IGetOrderInfoSuccessAction;

export const getOrderInfo = (num: string): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({
        type: GET_ORDER_INFO
    })
    request(`orders/${num}`, null).then(res => {
        dispatch({
            type: GET_ORDER_INFO_SUCCESS,
            order: res.orders[0]
        });

    }).catch(err => {
        dispatch({
            type: GET_ORDER_INFO_FAILED
        })
    })
}