import axios from 'axios';

import { API_NOTES } from 'actions/APIendpoints';
import {
  REMOVE_ITEM_REQUEST,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAILURE,
  EDIT_ITEM_REQUEST,
  EDIT_ITEM_SUCCESS,
  EDIT_ITEM_FAILURE,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from 'actions/types';
// import { returnErrors } from './errorActions';

export const fetchItems = itemType => dispatch => {
  dispatch({ type: FETCH_REQUEST });
  return axios
    .get(API_NOTES, {
      params: {
        userId: 1,
        itemType,
      },
    })
    .then(({ data }) => {
      dispatch({
        type: FETCH_SUCCESS,
        payload: {
          data,
          itemType,
        },
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_FAILURE });
      // dispatch(returnErrors(err.response.data, err.response.status, 'FETCH_ITEM_FAIL'));
    });
};

export const removeItem = (itemType, id) => dispatch => {
  dispatch({ type: REMOVE_ITEM_REQUEST });
  axios
    .delete(`${API_NOTES}/${id}`)
    .then(() => {
      dispatch({
        type: REMOVE_ITEM_SUCCESS,
        payload: {
          itemType,
          id,
        },
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: REMOVE_ITEM_FAILURE });
      // dispatch(returnErrors(err.response.data, err.response.status, 'REMOVE_ITEM_FAIL'));
    });
};

export const editItem = (itemType, itemContent) => dispatch => {
  dispatch({ type: EDIT_ITEM_REQUEST });
  const { id } = itemContent;
  return axios
    .put(`${API_NOTES}/${id}`, {
      userId: 1,
      type: itemType,
      title: itemContent.title,
      articleUrl: itemContent.articleUrl,
      noteContent: itemContent.noteContent,
      rating: itemContent.rating,
      dateUser: itemContent.dateUser,
    })
    .then(({ data }) => {
      dispatch({
        type: EDIT_ITEM_SUCCESS,
        payload: {
          data,
          itemType,
          id,
        },
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: EDIT_ITEM_FAILURE });
      // dispatch(returnErrors(err.response.data, err.response.status, 'EDIT_ITEM_FAIL'));
    });
};

export const addItem = (itemType, itemContent) => dispatch => {
  dispatch({ type: ADD_ITEM_REQUEST });
  return axios
    .post(API_NOTES, {
      userId: 1,
      type: itemType,
      title: itemContent.title,
      articleUrl: itemContent.articleUrl,
      noteContent: itemContent.noteContent,
      rating: itemContent.rating,
      dateUser: itemContent.dateUser,
    })
    .then(({ data }) => {
      dispatch({
        type: ADD_ITEM_SUCCESS,
        payload: {
          data,
          itemType,
        },
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: ADD_ITEM_FAILURE });
      // dispatch(returnErrors(err.response.data, err.response.status, 'ADD_ITEM_FAIL'));
    });
};
