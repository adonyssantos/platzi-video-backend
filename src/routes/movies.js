const express = require('express');
const MoviesService = require('../services/movies');

const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require('../utils/schemas/movies.js');

const validationHandler = require('../utils/middleware/validationHandler');

const moviesApi = app => {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  router.get('/', async (request, response, next) => {
    const { tags } = request.query;

    try {
      const movies = await moviesService.getMovies({ tags });

      response.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async (request, response, next) => {
      const { movieId } = request.params;

      try {
        const movies = await moviesService.getMovie({ movieId });

        response.status(200).json({
          data: movies,
          message: 'movie retrieved',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createMovieSchema),
    async (request, response, next) => {
      const { body: movie } = request;

      try {
        const createdMovieId = await moviesService.createMovie({ movie });

        response.status(201).json({
          data: createdMovieId,
          message: 'movies created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    async (request, response, next) => {
      const { movieId } = request.params;
      const { body: movie } = request;

      try {
        const updatedMovieId = await moviesService.updateMovie({
          movieId,
          movie,
        });

        response.status(200).json({
          data: updatedMovieId,
          message: 'movie updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async (request, response, next) => {
      const { movieId } = request.params;

      try {
        const deletedMovieId = await moviesService.deleteMovie({ movieId });

        response.status(200).json({
          data: deletedMovieId,
          message: 'movie deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.patch('/:movieId', async (request, response, next) => {
    const { movieId } = request.params;
    const { body: movie } = request;

    try {
      const updatedMovieId = await moviesService.partialUpdateMovie({
        movieId,
        movie,
      });

      response.status(200).json({
        data: updatedMovieId,
        message: 'movie updated partially',
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = moviesApi;
