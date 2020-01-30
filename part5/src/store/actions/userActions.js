import loginService from '../../services/loginService';
import blogService from '../../services/blogService';

export const login = credentials => {
  return async dispatch => {
    const loggedUser = await loginService.login(credentials);
    window.localStorage.setItem('user', JSON.stringify(loggedUser));
    blogService.setToken(loggedUser.token);
    return dispatch({
      type: 'LOGIN',
      payload: loggedUser
    });
  };
};

export const userLoginFromLocalStorage = user => {
  return async dispatch => {
    blogService.setToken(user.token);
    return dispatch({
      type: 'LOGIN',
      payload: user
    });
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};
