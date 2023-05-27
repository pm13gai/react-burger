import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TAuthActions } from './actions/auth';
import { TIngredientDetailsActions } from './actions/ingredient-details';
import { TMenuActions } from './actions/menu'
import { TOrderActions } from './actions/order';
import { TOrderDetailsActions } from './actions/order-details';
import { TResetActions } from './actions/reset';
import { rootReducer } from './reducers';
import { configureStore } from '@reduxjs/toolkit';

import { socketMiddleware } from './middleware/socket-middleware';
import type { } from 'redux-thunk/extend-redux'

import {
    connect as FeedWsConnect,
    disconnect as FeedWsDisconnect,
    wsConnecting as FeedWsConnecting,
    wsOpen as FeedWsOpen,
    wsClose as FeedWsClose,
    wsMessage as FeedWsNessage,
    wsError as FeedWsError
} from "./actions/feed";
import {
    connect as ProfileOrdersWsConnect,
    disconnect as ProfileOrdersWsDisconnect,
    wsConnecting as ProfileOrdersWsConnecting,
    wsOpen as ProfileOrdersWsOpen,
    wsClose as ProfileOrdersWsClose,
    wsMessage as ProfileOrdersWsNessage,
    wsError as ProfileOrdersWsError
} from "./actions/profile-orders";

import { TFeedActions } from './actions/feed';
import { TOrderInfoActions } from './actions/order-info';
import { TProfileOrdersActions } from './actions/profile-orders';

const wsActions = {
    wsConnect: FeedWsConnect,
    wsDisconnect: FeedWsDisconnect,
    wsConnecting: FeedWsConnecting,
    onOpen: FeedWsOpen,
    onClose: FeedWsClose,
    onError: FeedWsError,
    onMessage: FeedWsNessage,
};
const wsProfileActions = {
    wsConnect: ProfileOrdersWsConnect,
    wsDisconnect: ProfileOrdersWsDisconnect,
    wsConnecting: ProfileOrdersWsConnecting,
    onOpen: ProfileOrdersWsOpen,
    onClose: ProfileOrdersWsClose,
    onError: ProfileOrdersWsError,
    onMessage: ProfileOrdersWsNessage,
};

const feedMiddleware = socketMiddleware(wsActions);
const profileMiddleware = socketMiddleware(wsProfileActions);

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(feedMiddleware,profileMiddleware)
    }
})

type TApplicationActions = TAuthActions
    | TMenuActions
    | TOrderDetailsActions
    | TOrderActions
    | TResetActions
    | TIngredientDetailsActions
    | TFeedActions
    | TOrderInfoActions
    | TProfileOrdersActions;
//export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;