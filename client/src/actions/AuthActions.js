import axios from 'axios';
import { setAlert } from './AlertsActions';
import {
  ON_APP_ADDING,
  ON_APP_ADDED,
  ON_APP_ERROR,
  ON_LOG_IN,
  ON_LOGGED_IN,
  ON_AUTH_ERROR
} from './types';

export const onAppAdd = firebaseConfiguration => async dispatch => {
  dispatch({ type: ON_APP_ADDING });

  try {
    const res = await axios.post('/api/firestore/app', { firebaseConfiguration });
    dispatch({ type: ON_APP_ADDED, payload: res.data });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'error')));

    dispatch({ type: ON_APP_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
  }
}

export const onAppRemove = () => async dispatch => {
  dispatch({ type: ON_APP_ADDING });

  try {
    const res = await axios.delete('/api/firestore/app');
    dispatch({ type: ON_APP_ADDED, payload: res.data });
  } catch (error) {
    dispatch({ type: ON_APP_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
  }
}

export const onLogIn = data => async dispatch => {
  dispatch({ type: ON_LOG_IN });

  try {
    const res = await axios.post('/api/firestore/auth', { ...data });
    dispatch({ type: ON_LOGGED_IN, payload: res.data });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'error')));

    dispatch({ type: ON_AUTH_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
  }
}