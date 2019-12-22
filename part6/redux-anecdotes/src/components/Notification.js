import React from 'react';

const Notification = ({ store }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };
  return (
    <div style={style}>
      <ul>
        {store.getState().notifications.map(note => (
          <div key={note}>{note}</div>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
