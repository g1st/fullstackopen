const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const config = require("./utils/config");
const middleware = require("./utils/middleware");
const blogController = require("./controllers/blogController");
const userController = require("./controllers/userController");
const loginController = require("./controllers/loginController");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogController);
app.use("/api/users", userController);
app.use("/api/login", loginController);

app.use(middleware.frontEndErrors);
app.use(middleware.schemaValidationErrors);

module.exports = app;
