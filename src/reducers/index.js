import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import itemsReducer from './itemsReducer';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  items: itemsReducer,
});
