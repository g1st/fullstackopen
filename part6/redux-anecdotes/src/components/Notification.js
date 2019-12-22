import React from 'react';

const Notification = ({ store }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  const notes = store.getState().notification;

  return notes && <div style={style}>{notes}</div>;
};

export default Notification;
