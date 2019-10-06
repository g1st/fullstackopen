import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import phonebookService from './services/phonebookService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/persons').then(res => {
      setPersons(res.data);
    });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: phoneNumber
    };
    if (persons.some(person => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const { id } = persons.find(p => p.name === newName);
        return phonebookService
          .updatePerson(id, newPerson)
          .then(() => {
            const newPersonsArray = persons.map(p =>
              p.id === id ? { ...newPerson, id } : p
            );
            setPersons(newPersonsArray);
            setNewName('');
            setPhoneNumber('');
          })
          .catch(() => {
            setError(
              `Information of ${newPerson.name} has already been removed from server`
            );
          });
      }
    } else {
      phonebookService
        .addPerson(newPerson)
        .then(() => {
          axios.get('/api/persons').then(res => {
            setPersons(res.data);
          });
          setMessage(`${newName} has been added`);
          setNewName('');
          setPhoneNumber('');
        })
        .catch(() => alert(`${newPerson.name} is already in phonebook.`));
    }
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    personsData();
  };

  const handleDelete = (id, name) => () => {
    if (window.confirm(`Delete ${name}`)) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          const personsArr = persons.filter(p => p.id !== id);
          setPersons(personsArr);
        })
        .catch(() => alert(`Element can't be removed.`));
    }
  };

  const personsData = () => {
    const regExp = new RegExp(searchTerm, 'i');

    const personsToDisplay = persons.filter(person =>
      person.name.match(regExp)
    );

    return personsToDisplay.map(person => (
      <li key={person.name}>
        {person.name} {person.number}{' '}
        <button onClick={handleDelete(person.id, person.name)}>delete</button>
      </li>
    ));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message ? (
        <Notification message={message} setState={setMessage} />
      ) : null}
      {error ? (
        <Notification message={error} setState={setError} error />
      ) : null}
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
