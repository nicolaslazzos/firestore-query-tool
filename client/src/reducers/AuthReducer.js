import {
  ON_APP_ADDING,
  ON_APP_ADDED,
  ON_APP_ERROR,
  ON_LOG_IN,
  ON_LOGGED_IN,
  ON_AUTH_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  user: {},
  connected: false,
  error: {},
  loadingApp: false,
  loadingAuth: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_APP_ADDING:
      return { ...state, loadingApp: true, error: {} };
    case ON_APP_ADDED:
      return { ...state, loadingApp: false, ...action.payload };
    case ON_APP_ERROR:
      return { ...state, loadingApp: false, error: action.payload };
    case ON_LOG_IN:
      return { ...state, loadingAuth: true, error: {} };
    case ON_LOGGED_IN:
      return { ...state, loadingAuth: false, ...action.payload };
    case ON_AUTH_ERROR:
      return { ...state, loadingAuth: false, error: action.payload };
    default:
      return state;
  }
}