const express = require('express');
const { moviesMock } = require('../utils/mocks/movies');

const moviesApi = app => {
  const router = express.Router();
  app.use('/api/movies', router);

  router.get('/', async (request, response, next) => {
    try {
      const movies = await Promise.resolve(moviesMock);

      response.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:movieId', async (request, response, next) => {
    try {
      const movies = await Promise.resolve(moviesMock[0]);

      response.status(200).json({
        data: movies,
        message: 'movie retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      const createdMovieId = await Promise.resolve(moviesMock[0].id);

      response.status(201).json({
        data: createdMovieId,
        message: 'movies created',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:movieId', async (request, response, next) => {
    try {
      const updatedMovieId = await Promise.resolve(moviesMock[0].id);

      response.status(200).json({
        data: updatedMovieId,
        message: 'movie updated',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:movieId', async (request, response, next) => {
    try {
      const deletedMovieId = await Promise.resolve(moviesMock[0].id);

      response.status(200).json({
        data: deletedMovieId,
        message: 'movie deleted',
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = moviesApi;
