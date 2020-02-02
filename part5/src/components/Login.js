import React from 'react';
import { connect } from 'react-redux';
import { setNotification } from '../store/actions/notificationActions';
import { logout } from '../store/actions/userActions';

const Login = ({ user, setNotification, timerId, logout }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setNotification(`user ${user.name} logged out`, 'error', timerId);
    logout();
  };

  return (
    user && (
      <div>
        <span>{user.name} logged in </span>
        <button
          className="text-blue-500 hover:text-blue-800"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
    )
  );
};

const mapStateToProps = state => ({
  user: state.user,
  timerId: state.notification.id
});

export default connect(mapStateToProps, { setNotification, logout })(Login);
