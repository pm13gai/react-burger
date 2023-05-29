import { WebsocketStatus } from '../types/feed';
import { createReducer } from '@reduxjs/toolkit'

import { wsOpen, wsClose, wsMessage, wsError, wsConnecting } from "../actions/profile-orders";
  
export type TProfileOrdersState = {
    status: WebsocketStatus,
    connectionError: string,
    orders: Array<any>,
    total: number,
    totalToday: number

}

export const initialState: TProfileOrdersState = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    orders: [],
    total: 0,
    totalToday: 0
};

export const profileOrdersReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(wsConnecting, (state) => {
          state.status = WebsocketStatus.CONNECTING;
      })
      .addCase(wsOpen, (state) => {
          state.status = WebsocketStatus.ONLINE;
          state.connectionError = '';
      })
      .addCase(wsClose, (state) => {
        state.status = WebsocketStatus.OFFLINE;
      })
      .addCase(wsError, (state, action) => {
        state.connectionError = action.payload;
      })
      .addCase(wsMessage, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })

  })

                      