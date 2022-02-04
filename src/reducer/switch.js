import { combineReducers } from 'redux';
import {
  DELETE_ITEM_IN_CART,
  SET_CURRENCY,
  SET_ITEM_IN_CART,
  UPDATE_ITEM_AMOUNT_IN_CART
} from './variables';

const initialData = {
  currency: '',
  cart: []
};

const generalReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case SET_CURRENCY:
      return { ...state, currency: payload };
    case SET_ITEM_IN_CART:
      return { ...state, cart: [payload, ...state.cart] };
    case UPDATE_ITEM_AMOUNT_IN_CART:
      const { myId, amount } = payload;
      const tempCart = [...state.cart];
      tempCart.find((a) => a.myId === myId).amount = amount;

      return { ...state, cart: tempCart };
    case DELETE_ITEM_IN_CART:
      return { ...state, cart: state.cart.filter((a) => a.myId !== payload) };
    default:
      return state;
  }
};

export default combineReducers({
  general: generalReducer
});
