import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import QueryResultReducer from './QueryResultReducer';
import AlertsReducer from './AlertsReducer';

const reducers = combineReducers({
  queryResult: QueryResultReducer,
  alerts: AlertsReducer,
});

export default createStore(reducers, {}, applyMiddleware(ReduxThunk));