import React from 'react';

const Notification = ({ message, setState, error }) => {
  setTimeout(() => {
    setState(null);
  }, 5000);

  return (
    <div className={`notification ${error ? 'error' : ''}`}>{message}</div>
  );
};

export default Notification;
