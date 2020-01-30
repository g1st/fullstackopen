import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';

const store = createStore(
  combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer
  }),
  applyMiddleware(thunk)
);

export default store;
