import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ message, type }) => {
  return message && <div className={`notification ${type}`}>{message}</div>;
};

const mapStateToProps = state => ({
  message: state.notification.content,
  type: state.notification.type
});

export default connect(mapStateToProps)(Notification);
