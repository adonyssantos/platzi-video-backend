const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock, MoviesServicesMock } = require('../utils/mocks/movies.js');
const testServer = require('../utils/testServer.js');

describe('routes - movies', () => {
  const route = proxyquire('../routes/movies.js', {
    '../services/movies.js': MoviesServicesMock,
  });

  const request = testServer(route);

  describe('GET /movies', () => {
    it('should respond with status 200', done => {
      request.get('/api/movies').expect(200, done);
    });

    it('should respond with the list of movies', done => {
      request.get('/api/movies').end((_error, response) => {
        assert.deepEqual(response.body, {
          data: moviesMock,
          message: 'movies listed',
        });

        done();
      });
    });
  });
});
