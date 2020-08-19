
import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (message, alertType, timeout = 5000) => dispatch => {
  const id = uuid();

  dispatch({ type: SET_ALERT, payload: { id, message, alertType } });

  if (timeout) setTimeout(() => dispatch(removeAlert(id)), timeout);
}

export const removeAlert = id => ({ type: REMOVE_ALERT, payload: id });