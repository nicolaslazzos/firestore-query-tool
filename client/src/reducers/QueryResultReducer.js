import {
  ON_DATA_READING,
  ON_DATA_READ,
  ON_DATA_DELETED,
  ON_DATA_DELETING,
  ON_QUERY_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  data: [],
  loading: false,
  deleting: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_DATA_READING:
      return { ...state, loading: true, error: '' };
    case ON_DATA_READ:
      return { ...state, loading: false, data: action.payload };
    case ON_DATA_DELETING:
      return { ...state, deleting: true, error: '' };
    case ON_DATA_DELETED:
      return { ...state, deleting: false, data: state.data.filter(doc => !action.payload.includes(doc.path)) };
    case ON_QUERY_ERROR:
      return { ...state, loading: false, deleting: false, error: action.payload };
    default:
      return state;
  }
};