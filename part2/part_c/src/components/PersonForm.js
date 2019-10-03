import React from 'react';

const PersonForm = ({
  handleSubmit,
  newName,
  setNewName,
  phoneNumber,
  setPhoneNumber
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{' '}
        <input
          value={newName}
          onChange={event => setNewName(event.target.value)}
        />
      </div>
      <div>
        number:{' '}
        <input
          type="tel"
          value={phoneNumber}
          onChange={event => setPhoneNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
