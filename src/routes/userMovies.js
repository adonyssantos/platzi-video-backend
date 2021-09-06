const express = require('express');
const passport = require('passport');

const UserMoviesService = require('../services/userMovies');
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const { movieIdSchema } = require('../utils/schemas/movies');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserMoviesSchema } = require('../utils/schemas/userMovies');

// JwT strategy
require('../utils/auth/strategies/jwt');

const userMoviesApi = app => {
  const router = express.Router();
  app.use('/api/user-movies', router);

  const userMoviesService = new UserMoviesService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:user-movies']),
    validationHandler({ userId: userIdSchema }, 'query'),
    async (request, response, next) => {
      const { userId } = request.query;

      try {
        const userMovies = await userMoviesService.getUserMovies({ userId });

        response.status(200).json({
          data: userMovies,
          message: 'user movies listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:user-movies']),
    validationHandler(createUserMoviesSchema),
    async (request, response, next) => {
      const { body: userMovie } = request;

      try {
        const createdUserMovieId = await userMoviesService.createUserMovies({
          userMovie,
        });

        response.status(201).json({
          data: createdUserMovieId,
          message: 'user movie created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:userMovieId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:user-movies']),
    validationHandler({ userMovieId: movieIdSchema }, 'params'),
    async (request, response, next) => {
      const { userMovieId } = request.param;

      try {
        const deletedUserMovieId = await userMoviesService.deleteUserMovie({
          userMovieId,
        });

        response.status(200).json({
          data: deletedUserMovieId,
          message: 'user movie deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = userMoviesApi;
