const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const debug = require('debug')('app:server');
const app = express();

const { config } = require('./config');
const authApi = require('./routes/auth');
const moviesApi = require('./routes/movies.js');
const userMoviesApi = require('./routes/userMovies.js');

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler.js');

// body parser
const corsOptions = { origin: config.domain };

app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());

// routes
authApi(app);
moviesApi(app);
userMoviesApi(app);

// catch 404
app.use(notFoundHandler);

// errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  const url = `http://localhost:${config.port}`;
  debug(`Server is running on ${url}`);
});
