import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  TOKEN_FAIL,
} from '../actions/types';

const initialState = {
  // token: localStorage.getItem('token'), // works fine, not chceck is token valid
  token: null,
  tokenExpiresIn: null,
  isAuthenticated: false,
  isLoading: false,
  // user: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        tokenExpiresIn: action.payload.tokenInformation,
        token: action.payload.data,
        isAuthenticated: true,
        isLoading: false,
        // user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      // localStorage.setItem('token', action.payload);
      // console.log(action.payload);
      return {
        ...state,
        token: action.payload.token,
        tokenExpiresIn: action.payload.tokenInformation,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case TOKEN_FAIL:
      // localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        tokenExpiresIn: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
