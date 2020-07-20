import axios from 'axios';
import {
  ON_DATA_READING,
  ON_DATA_READ,
  ON_DATA_READ_FAIL
} from './types';

export const onDataRead = ({ pathInputs, whereInputs, extraInputs }) => async dispatch => {
  dispatch({ type: ON_DATA_READING });

  try {
    const res = await axios.post('/api/firestore', { pathInputs, whereInputs, extraInputs });
    dispatch({ type: ON_DATA_READ, payload: res.data });
  } catch (error) {
    console.error(error.message);
    dispatch({ type: ON_DATA_READ_FAIL, payload: error });
  }
}