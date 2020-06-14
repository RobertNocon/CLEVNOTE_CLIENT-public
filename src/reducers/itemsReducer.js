import {
  REMOVE_ITEM_SUCCESS,
  ADD_ITEM_SUCCESS,
  AUTH_SUCCESS,
  FETCH_SUCCESS,
  SET_CURRENT_USER,
  EDIT_ITEM_SUCCESS,
  LOGOUT_SUCCESS,
} from 'actions/types';
import { isEmptyArray } from 'formik';

const initialState = {
  notes: [],
  todos: [],
  articles: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...action.payload.data],
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        userID: action.payload.data,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmptyArray(action.user),
        user: action.user,
        userID: action.user,
      };

    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...state[action.payload.itemType], ...action.payload.data],
      };

    case EDIT_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].map(item => {
            if (item.id !== action.payload.id) {
              return item;
            }
            if (item.id === action.payload.id) {
              return { ...action.payload.data };
            }
            return null;
          }),
        ],
      };

    case REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].filter(item => item.id !== action.payload.id),
        ],
      };

    case LOGOUT_SUCCESS:
      return {
        notes: [],
        todos: [],
        articles: [],
      };
    default:
      return state;
  }
};

export default rootReducer;
