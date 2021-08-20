const express = require('express');
const app = express();

const { config } = require('./config');
const moviesApi = require('./routes/movies.js');

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler.js');

// body parser
app.use(express.json());

moviesApi(app);

// catch 404
app.use(notFoundHandler);

// errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  const url = `http://localhost:${config.port}`;
  console.info(`Server is running on ${url}`);
});
