const express = require('express');
const app = express();

const { config } = require('./config');
const moviesApi = require('./routes/movies.js');

moviesApi(app);

app.listen(config.port, () => {
  const url = `http://localhost:${config.port}`;
  console.log(`Server is running on ${url}`);
});
