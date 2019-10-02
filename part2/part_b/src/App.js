import React, { useState } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }

    const newPersonsArray = persons.concat({
      name: newName,
      number: phoneNumber
    });
    setPersons(newPersonsArray);
    setNewName('');
    setPhoneNumber('');
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    personsData();
  };

  const personsData = () => {
    const regExp = new RegExp(searchTerm, 'i');

    const personsToDisplay = persons.filter(person =>
      person.name.match(regExp)
    );

    return personsToDisplay.map(person => (
      <li key={person.name}>
        {person.name} {person.number}
      </li>
    ));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        personsData={personsData}
        handleSearch={handleSearch}
      />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsData()} />
    </div>
  );
};

export default App;
