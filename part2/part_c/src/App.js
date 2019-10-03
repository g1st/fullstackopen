import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Countries from './components/Countries';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(res => {
      setPersons(res.data);
    });
  }, []);

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
      <Countries />
    </div>
  );
};

export default App;
