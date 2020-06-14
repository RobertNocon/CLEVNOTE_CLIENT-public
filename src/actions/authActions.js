import axios from 'axios';
import jwt from 'jsonwebtoken';
import { API_LOGIN, API_REGISTER } from 'actions/APIendpoints';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  // AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_REQUEST,
  TOKEN_FAIL,
  // SET_CURRENT_USER,
  // DELETE_CURRENT_USER,
} from './types';
// import { IAuthFunction, IConfigHeaders } from '../../types/interfaces';

// function setCurrentUser(user) {
//   // console.log('setCurrentUser');
//   // console.dir(user);
//   // console.dir(Object.entries(user).length);
//   return {
//     type: SET_CURRENT_USER,
//     user,
//   };
// }

function setAuthorizationToken(token) {
  // Jeżeli posiadamy token, dołaczamy go do wszystkich zapytań
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // console.log('default heder with token - SET');
  } else {
    delete axios.defaults.headers.common.Authorization;
    // console.log('default heder with token - deleted');
  }
}

const getTokenExpiredTime = decodedToken => {
  const sec = decodedToken.exp - Date.now() / 1000;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor((sec % 3600) % 60);
  const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
  const time = hDisplay + mDisplay + sDisplay;
  // console.log(time);
  return time;
};

const checkToken = token => {
  const decodedToken = jwt.decode(token);
  // console.log(typeof token);
  // if (typeof token !== 'string') {
  //   return 1;
  // }

  try {
    if (decodedToken.exp == null || decodedToken.exp < Date.now() / 1000) {
      return 1;
    }
    const ExpiredTime = getTokenExpiredTime(decodedToken);
    return ExpiredTime;
  } catch {
    return 1;
  }
};

// === Check token in localstorage & load user token to store (start: root.js) ===
export const loadUser = token => dispatch => {
  dispatch({ type: USER_LOADING });
  const tokenInformation = checkToken(token);
  if (tokenInformation !== 1) {
    setAuthorizationToken(token);

    dispatch({ type: USER_LOADED, payload: { tokenInformation, token } });
  } else {
    dispatch({ type: TOKEN_FAIL });
  }

  //   // setInterval(function() {
  //   //   getTokenExpiredTime(decodedToken);
  //   // }, 1000);
  // }

  // axios
  //   .get(API_LOGIN, tokenConfig(getState))
  //   .then(res =>
  //     dispatch({
  //       type: USER_LOADED,
  //       payload: res.data,
  //     }),
  //   )
  //   .catch(err => {
  //     dispatch(returnErrors(err.response.data, err.response.status));
  //     dispatch({
  //       type: AUTH_ERROR,
  //     });
  //   });
};

// === Login User and set token to every request ===
export const loginUser = (login, password) => dispatch => {
  dispatch({ type: AUTH_REQUEST });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ login, password });
  axios
    .post(API_LOGIN, body, config)
    .then(res => {
      const { data } = res;
      /* global localStorage */
      localStorage.setItem('token', data);
      setAuthorizationToken(data);
      const tokenInformation = checkToken(data);
      dispatch({ type: LOGIN_SUCCESS, payload: { data, tokenInformation } });
    })
    .catch(err => {
      try {
        alert(err.response.data);
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
        dispatch({
          type: LOGIN_FAIL,
        });
      } catch {
        dispatch(returnErrors('Unknow error', 'Unknow error', 'LOGIN_FAIL'));
        dispatch({
          type: LOGIN_FAIL,
        });
      }
    });
};

// === Register User ===
export const registerUser = (login, password) => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ login, password });

  axios
    .post(API_REGISTER, body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      }),
    )
    .catch(err => {
      try {
        alert(err.response.data);
        dispatch({
          type: REGISTER_FAIL,
        });
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
      } catch {
        dispatch(returnErrors('Unknow error', 'Unknow error', 'LOGIN_FAIL'));
        dispatch({
          type: LOGIN_FAIL,
        });
      }
      // dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
    });
};

// === Register User & remove token from axios request ===
export const logout = () => {
  localStorage.removeItem('token');
  setAuthorizationToken(false); // remove default Bearer drom axios
  return {
    type: LOGOUT_SUCCESS,
    user: null,
  };
};

// // Setup config --> headers and token - check if we have token in local storage
// export const tokenConfig = getState => {
//   // Get token from localstorage - if token exist
//   const token = getState().auth.token;

//   // Set headers
//   const config = {
//     headers: {
//       // 'Content-type': 'application/json',
//     },
//   };

//   // If token, also add to headers
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// };
