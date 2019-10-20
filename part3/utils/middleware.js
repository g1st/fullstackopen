module.exports = {
  unknownEndpoint: (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
  },
  schemaValidationErrorHandler: (err, req, res, next) => {
    const { errors } = err;

    const hasNameError = Object.prototype.hasOwnProperty.call(errors, 'name');
    const hasNumberError = Object.prototype.hasOwnProperty.call(
      errors,
      'number'
    );

    if (hasNameError) {
      return res.status(400).json({ error: errors.name });
    }
    if (hasNumberError) {
      return res.status(400).json({ error: errors.number });
    }
    next(err);
  },
  errorHandler: (err, req, res, next) => {
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(400).send({ error: 'malformatted id' });
    }
    next(err);
  }
};
