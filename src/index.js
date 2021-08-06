const express = require('express');
const app = express();

const { config } = require('./config');

app.get('/', (request, response) => {
  response.send('Hello world');
});

app.get('/api', (request, response) => {
  response.json({ name: 'Adonys', lastName: 'Santos', age: 17 });
});

app.listen(config.port, () => {
  const url = `http://localhost:${config.port}`;
  console.log(`Server is running on ${url}`);
});
