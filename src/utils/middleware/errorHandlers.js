const boom = require('@hapi/boom');
const { config } = require('../../config');

const withErrorStack = (error, stack) => {
  if (config.dev) {
    return { ...error, stack };
  }

  return error;
};

const logErrors = (error, _request, _response, next) => {
  console.error(error);
  next(error);
};

const wrapErrors = (error, _request, _response, next) => {
  if (!error.isBoom) {
    next(boom.badImplementation(error));
  }

  next(error);
};

const errorHandler = (
  error,
  _request,
  response,
  _next // eslint-disable-line
) => {
  const {
    output: { statusCode, payload },
  } = error;

  response.status(statusCode);
  response.json(withErrorStack(payload, error.stack));
};

module.exports = { logErrors, wrapErrors, errorHandler };
