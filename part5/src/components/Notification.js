import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ message, error }) => {
  return (
    message && (
      <div className={error ? 'text-red-500' : 'text-green-500'}>{message}</div>
    )
  );
};

const mapStateToProps = state => ({
  message: state.notification.content,
  error: state.notification.type
});

export default connect(mapStateToProps)(Notification);
