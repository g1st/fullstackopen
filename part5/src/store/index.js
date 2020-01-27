import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import blogReducer from './reducers';

import notificationReducer from './reducers/notificationReducer';
// import userReducer from './reducers';

const store = createStore(
  combineReducers({ notification: notificationReducer }),
  applyMiddleware(thunk)
);

export default store;
