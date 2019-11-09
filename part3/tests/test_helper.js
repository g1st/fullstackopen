const Person = require('../models/person');

const initialPersons = [
  {
    name: 'Arto Hellas',
    number: '040-1234567'
  },
  {
    name: 'Artosas',
    number: '123-0000000'
  }
];

const nonExistingId = async () => {
  const person = new Person({ name: 'willremovethissoon' });
  await person.save();
  await person.remove();

  return person._id.toString();
};

const personsInDb = async () => {
  const persons = await Person.find({});
  return persons.map(person => person.toJSON());
};

module.exports = {
  initialPersons,
  nonExistingId,
  personsInDb
};
