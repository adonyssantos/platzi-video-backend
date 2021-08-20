const boom = require('@hapi/boom');

const notFoundHandler = (_request, response) => {
  const {
    output: { statusCode, payload },
  } = boom.notFound();

  response.status(statusCode).json(payload);
};

module.exports = notFoundHandler;
