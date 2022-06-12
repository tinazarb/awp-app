import { combineReducers } from 'redux';
import productsReducer from './photos';
import cartReducer from './favorites';
import authReducer from './auth';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
});

export default rootReducer;
