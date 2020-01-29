import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
// import userReducer from './reducers';

const store = createStore(
  combineReducers({ blogs: blogReducer, notification: notificationReducer }),
  applyMiddleware(thunk)
);

export default store;
