const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Person = require('../models/person');
const { initialPersons, nonExistingId, personsInDb } = require('./test_helper');

beforeEach(async () => {
  await Person.deleteMany({});
  const personsObject = initialPersons.map(person => new Person(person));
  const personsPromises = personsObject.map(person => person.save());
  await Promise.all(personsPromises);
});

test('persons are returned as json', async () => {
  await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all persons are returned', async () => {
  const response = await api.get('/api/persons');

  expect(response.body.length).toBe(initialPersons.length);
});

test('a specific name is within the returned persons', async () => {
  const response = await api.get('/api/persons');

  const names = response.body.map(r => r.name);
  expect(names).toContain('Artosas');
});

test('a valid person can be added', async () => {
  const newPerson = {
    name: 'Johnny Bravo',
    number: 123123123
  };

  await api
    .post('/api/persons')
    .send(newPerson)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const personsAtEnd = await personsInDb();
  expect(personsAtEnd.length).toBe(initialPersons.length + 1);

  const names = personsAtEnd.map(person => person.name);
  expect(names).toContain('Johnny Bravo');
});

test('a person without content will not be saved into database', async () => {
  const newPerson = {
    name: 'Johnny Bravo'
  };
  await api
    .post('/api/persons')
    .send(newPerson)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  const personsAtEnd = await personsInDb();
  expect(personsAtEnd.length).toBe(initialPersons.length);
});

test('a specific person can be viewed', async () => {
  const personsAtStart = await personsInDb();
  const personToView = personsAtStart[0];

  const resultPerson = await api
    .get(`/api/persons/${personToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(resultPerson.body).toEqual(personToView);
});

test('a person can be deleted', async () => {
  const personsAtStart = await personsInDb();
  const personToBeDeleted = personsAtStart[0];

  await api.delete(`/api/persons/${personToBeDeleted.id}`).expect(204);

  const personsAtEnd = await personsInDb();
  expect(personsAtEnd.length).toBe(personsAtStart.length - 1);

  const names = personsAtEnd.map(person => person.name);
  expect(names).not.toContain(personToBeDeleted.name);
});

afterAll(() => {
  mongoose.connection.close();
});
