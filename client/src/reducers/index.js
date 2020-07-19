import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import QueryResultReducer from './QueryResultReducer';

const reducers = combineReducers({
  queryResult: QueryResultReducer
});

export default createStore(reducers, {}, applyMiddleware(ReduxThunk));