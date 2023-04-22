import { request } from '../../utils/burger-api'
import { REMOVE_ALL_INGREDIENTS } from './order';
import { SET_INITIAL_COUNT } from './menu';
import { getCookie } from '../../utils/utils';


export const POST_ORDER = "POST_ORDER"
export const POST_ORDER_FAILED = "POST_ORDER_FAILED"
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS"
export const CLEAR_ORDER_DETAILS = "CLEAR_ORDER_DETAILS"


export const postIngredients = (order) => (dispatch) => {
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

