const boom = require('@hapi/boom');

const validate = () => false;

const validationHandler = (schema, check = 'body') => {
  return (request, _response, next) => {
    const error = validate(request[check], schema);
    error ? next(boom.badRequest(error)) : next();
  };
};

module.exports = validationHandler;
