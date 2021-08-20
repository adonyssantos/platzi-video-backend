const { config } = require('../../config');

const withErrorStack = (error, stack) => {
  if (config.dev) {
    return { error, stack };
  }

  return error;
};

const logErrors = (error, _request, _response, next) => {
  console.error(error);
  next(error);
};

const errorHandler = (error, _request, response) => {
  response.status(error.status || 200);
  response.json(withErrorStack(error.message, error.stack));
};

module.exports = { logErrors, errorHandler };
