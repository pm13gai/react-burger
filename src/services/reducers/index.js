import { combineReducers } from 'redux';
import { menuReducer } from './menu';
import { orderReducer } from './order';
import { orderDetailsReducer } from './order-details';
import { ingredientDetailsReducer } from './ingredient-details';



export const rootReducer = combineReducers({
  menu: menuReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  ingredientDetails: ingredientDetailsReducer
});