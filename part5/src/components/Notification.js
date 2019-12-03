import React, { useEffect } from 'react';

const Notification = ({ message, setNotification, setError, error }) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      setNotification(null);
      setError(null);
    }, 5000);
    return () => {
      clearTimeout(timerId);
    };
  }, [message, setNotification, setError, error]);

  return (
    <div className={`notification ${error ? 'error' : ''}`}>{message}</div>
  );
};

export default Notification;
