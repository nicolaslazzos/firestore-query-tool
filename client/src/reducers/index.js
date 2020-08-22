import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import QueryResultReducer from './QueryResultReducer';
import AlertsReducer from './AlertsReducer';
import AuthReducer from './AuthReducer';

const reducers = combineReducers({
  queryResult: QueryResultReducer,
  alerts: AlertsReducer,
  auth: AuthReducer,
});

export default createStore(reducers, {}, applyMiddleware(ReduxThunk));