import {
    GET_ORDER_INFO,
    GET_ORDER_INFO_FAILED,
    GET_ORDER_INFO_SUCCESS,
    TOrderInfoActions
} from '../actions/order-info';
import { IOrderData } from '../types/feed';

export type TOrderInfoState = {
    order: IOrderData | null,
    requestOrderInfoFailed: boolean
}

const initialState: TOrderInfoState = {
    order: null,
    requestOrderInfoFailed: false
}

export const orderInfoReducer = (state = initialState, action: TOrderInfoActions): TOrderInfoState => {
    switch (action.type) {
        case GET_ORDER_INFO: {
            return {
                ...state,
                requestOrderInfoFailed: false,
            };
        }
        case GET_ORDER_INFO_SUCCESS: {
            return {
                ...state,
                order: action.order
            };
        }
        case GET_ORDER_INFO_FAILED: {
            return {
                ...state,
                requestOrderInfoFailed: true
            };
        }


        default: {
            return state
        }
    }
} 