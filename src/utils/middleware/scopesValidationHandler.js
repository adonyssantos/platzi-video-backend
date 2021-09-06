const boom = require('@hapi/boom');

const scopesValidationHandler = allowedScopes => {
  return (request, response, next) => {
    if (!request.user || !request.user.scopes) {
      return next(boom.unauthorized('Missing scopes'));
    }

    const permissions = allowedScopes.map(allowScope =>
      request.user.scopes.includes(allowScope)
    );
    const hasAccess = !permissions.includes(false);

    if (hasAccess) {
      next();
    } else {
      return next(boom.unauthorized('Insufficient scopes'));
    }
  };
};

module.exports = scopesValidationHandler;
