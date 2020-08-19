import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [action.payload, ...state];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
}