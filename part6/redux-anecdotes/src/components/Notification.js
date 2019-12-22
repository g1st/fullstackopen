import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  const note = notification;

  return note && <div style={style}>{note}</div>;
};

const mapStateToProps = state => ({
  notification: state.notification
});

export default connect(mapStateToProps)(Notification);
