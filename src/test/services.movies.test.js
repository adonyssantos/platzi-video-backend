const assert = require('assert');
const proxyquire = require('proxyquire');

const { getAllStub, MongoLibMock } = require('../utils/mocks/mongoLib');

const { moviesMock } = require('../utils/mocks/movies');

describe('services - movies', () => {
  const MoviesServices = proxyquire('../services/movies.js', {
    '../lib/mongo.js': MongoLibMock,
  });

  const moviesServices = new MoviesServices();

  describe('when getMovies method is called', async () => {
    it('should call the getAll MongoLib method', async () => {
      await moviesServices.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of movies', async () => {
      const result = await moviesServices.getMovies({});
      const expected = moviesMock;
      assert.deepEqual(result, expected);
    });
  });
});
