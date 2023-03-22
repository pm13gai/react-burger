import { postIngredientsFetch } from '../../utils/burger-api'
import { REMOVE_ALL_INGREDIENTS } from './order';
import { SET_INITIAL_COUNT } from './menu';


export const POST_ORDER = "POST_ORDER"
export const POST_ORDER_FAILED = "POST_ORDER_FAILED"
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS"
export const CLEAR_ORDER_DETAILS = "CLEAR_ORDER_DETAILS"


export const postIngredients = (order) => (dispatch, getState) => {
    dispatch({
        type: POST_ORDER
    })
    postIngredientsFetch(order).then(res => {
        dispatch({
            type: POST_ORDER_SUCCESS,
            number: res.order.number
        });
        dispatch({ type: REMOVE_ALL_INGREDIENTS });
        dispatch({ type: SET_INITIAL_COUNT, bun: getState().order.bun });
    }).catch(err => {
        dispatch({
            type: POST_ORDER_FAILED
        })
    })
}

