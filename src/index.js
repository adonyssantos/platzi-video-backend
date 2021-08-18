const express = require('express');
const app = express();

const { config } = require('./config');
const moviesApi = require('./routes/movies.js');

// body parser
app.use(express.json());

moviesApi(app);

app.listen(config.port, () => {
  const url = `http://localhost:${config.port}`;
  console.log(`Server is running on ${url}`);
});
