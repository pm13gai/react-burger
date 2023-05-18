import {
    POST_ORDER,
    POST_ORDER_FAILED,
    POST_ORDER_SUCCESS,
    CLEAR_ORDER_DETAILS,
    TOrderDetailsActions
} from '../actions/order-details';

export type TOrderDetailsState = {
    orderRequest: boolean,
    orderFailed: boolean,
    number: number | null
}

const initialState: TOrderDetailsState = {
    orderRequest: false,
    orderFailed: false,
    number: null
}

export const orderDetailsReducer = (state = initialState, action: TOrderDetailsActions): TOrderDetailsState => {
    switch (action.type) {
        case POST_ORDER: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            };
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                number: action.number,
                orderRequest: false
            };
        }
        case POST_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            };
        }
        case CLEAR_ORDER_DETAILS: {
            return initialState;
        }
        default: {
            return state
        }
    }
} 