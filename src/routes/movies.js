const express = require('express');
const passport = require('passport');
const MoviesService = require('../services/movies');

const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require('../utils/schemas/movies.js');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');

// JwT strategy
require('../utils/auth/strategies/jwt');

const moviesApi = app => {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:movies']),
    async (request, response, next) => {
      cacheResponse(response, FIVE_MINUTES_IN_SECONDS);
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
    }
  );

  router.get(
    '/:movieId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:movies']),
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async (request, response, next) => {
      cacheResponse(response, SIXTY_MINUTES_IN_SECONDS);

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
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:movies']),
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
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:movies']),
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
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:movies']),
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

  router.patch(
    '/:movieId',
    passport.authenticate('jwt', { session: false }),
    async (request, response, next) => {
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
    }
  );
};

module.exports = moviesApi;
