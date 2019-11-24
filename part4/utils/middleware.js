const schemaValidationErrors = async (err, req, res, next) => {
  const titleError = Object.hasOwnProperty.call(err.errors, "title");
  const urlError = Object.hasOwnProperty.call(err.errors, "url");
  const usernameError = Object.hasOwnProperty.call(err.errors, "username");

  if (titleError) {
    return res.status(400).json({ error: err.errors.title.message });
  }
  if (urlError) {
    return res.status(400).json({ error: err.errors.url.message });
  }
  if (usernameError) {
    return res.status(400).json({ error: err.errors.username.message });
  }
  next(err);
};

const frontEndErrors = async (err, req, res, next) => {
  const frontError = Object.hasOwnProperty.call(err, "message");
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  }
  if (frontError) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
    return next();
  }
  next();
};

module.exports = {
  schemaValidationErrors,
  frontEndErrors,
  tokenExtractor
};
