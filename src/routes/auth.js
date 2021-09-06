const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');
const UsersService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');
const { createUserSchema } = require('../utils/schemas/users');

const { config } = require('../config');

// Basic strategy
require('../utils/auth/strategies/basic');

const authApi = app => {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();
  const usersService = new UsersService();

  router.post('/sign-in', async (request, response, next) => {
    const { apiKeyToken } = request.body;

    if (!apiKeyToken) {
      return next(boom.unauthorized('apiKeyToken is required'));
    }

    passport.authenticate('basic', (error, user) => {
      try {
        if (error || !user) {
          return next(boom.unauthorized());
        }

        request.login(user, { session: false }, async error => {
          if (error) {
            return next(error);
          }

          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

          if (!apiKey) {
            return next(boom.unauthorized());
          }

          const { _id: id, name, email } = user;

          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes,
          };

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m',
          });

          return response.status(200).json({
            token,
            user: { id, name, email },
          });
        });
      } catch (error) {
        next(error);
      }
    })(request, response, next);
  });

  router.post(
    '/sign-up',
    validationHandler(createUserSchema),
    async (request, response, next) => {
      const { body: user } = request;

      try {
        const createdUserId = await usersService.createUser({ user });

        response.status(201).json({
          data: createdUserId,
          message: 'user created',
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = authApi;
