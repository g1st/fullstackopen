const Blog = require('../modules/blog');

const schemaValidationErrors = async (err, req, res, next) => {
  const titleError = Object.hasOwnProperty.call(err.errors, 'title');
  const urlError = Object.hasOwnProperty.call(err.errors, 'url');
  if (titleError) {
    return res.status(400).json({ error: err.errors.title.message });
  }
  if (urlError) {
    return res.status(400).json({ error: err.errors.url.message });
  }
  next(err);
};

module.exports = {
  schemaValidationErrors
};
