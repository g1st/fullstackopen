const Person = require('../models/person');

module.exports.getInfo = async (req, res) => {
  const documents = await Person.countDocuments({});

  res.send(`<p>Phonebook has info for ${documents} people</p>
      <p>${new Date()}</p>`);
};
