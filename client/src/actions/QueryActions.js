import axios from 'axios';
import { setAlert } from './AlertsActions';
import {
  ON_DATA_READING,
  ON_DATA_READ,
  ON_DATA_DELETED,
  ON_DATA_DELETING,
  ON_QUERY_ERROR
} from './types';

export const onDataRead = ({ pathInputs, whereInputs, extraInputs }) => async dispatch => {
  dispatch({ type: ON_DATA_READING });
  
  try {
    const res = await axios.post('/api/firestore', { pathInputs, whereInputs, extraInputs });
    dispatch({ type: ON_DATA_READ, payload: res.data });
  } catch (error) {
    const errors = error.response.data.errors;
    
    if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    
    dispatch({ type: ON_QUERY_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
  }
}

export const onDataDelete = paths => async dispatch => {
  dispatch({ type: ON_DATA_DELETING });

  try {
    const res = await axios.post('/api/firestore/delete', { paths });
    dispatch({ type: ON_DATA_DELETED, payload: res.data });
  } catch (error) {
    dispatch({ type: ON_QUERY_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
  }
}