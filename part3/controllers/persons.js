const Person = require('../models/person');

module.exports = {
  index: async (req, res) => {
    const persons = await Person.find({});

    return res.json(persons.map(p => p.toJSON()));
  },
  getPerson: async (req, res, next) => {
    const { id } = req.params;
    try {
      const person = await Person.findById(id);

      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  },
  deletePerson: async (req, res, next) => {
    const { id } = req.params;
    try {
      await Person.findByIdAndRemove(id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
  addPersonPost: async (req, res, next) => {
    const { name, number } = req.body;
    const person = new Person({
      name,
      number
    });
    try {
      const savedPerson = await person.save();

      res.json(savedPerson.toJSON());
    } catch (err) {
      next(err);
    }
  },
  updatePersonPut: async (req, res, next) => {
    const { id } = req.params;
    const { name, number } = req.body;

    try {
      const person = await Person.findByIdAndUpdate(
        id,
        { name, number },
        { runValidators: true, context: 'query', new: true }
      );

      if (person) {
        res.status(201).json(person.toJSON());
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  }
};
