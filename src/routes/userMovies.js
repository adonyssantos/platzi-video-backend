const express = require('express');

const UserMoviesService = require('../services/userMovies');
const validationHandler = require('../utils/middleware/validationHandler');

const { movieIdSchema } = require('../utils/schemas/movies');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserMoviesSchema } = require('../utils/schemas/userMovies');

const userMoviesApi = app => {
  const router = express.Router();
  app.use('/api/user-movies', router);

  const userMoviesService = new UserMoviesService();

  router.get(
    '/',
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
