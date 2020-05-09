import {
  ON_DATA_READING,
  ON_DATA_READ,
  ON_DATA_READ_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_DATA_READING:
      return { ...state, loading: true, error: '' };
    case ON_DATA_READ:
      return { ...state, loading: false, data: action.payload };
    case ON_DATA_READ_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};