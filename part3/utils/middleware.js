const logger = require('./logger');

module.exports = {
  requestLogger: (request, response, next) => {
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Body:  ', request.body);
    logger.info('---');
    next();
  },
  unknownEndpoint: (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
  },
  schemaValidationErrorHandler: (err, req, res, next) => {
    const hasNameError = Object.prototype.hasOwnProperty.call(err, 'name');
    const hasNumberError = Object.prototype.hasOwnProperty.call(err, 'number');

    if (hasNameError) {
      return res.status(400).json({ error: err.name });
    }
    if (hasNumberError) {
      return res.status(400).json({ error: err.number });
    }
    next(err);
  },
  errorHandler: (err, req, res, next) => {
    logger.error(err.message);
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(400).send({ error: 'malformatted id' });
    }
    next(err);
  }
};
