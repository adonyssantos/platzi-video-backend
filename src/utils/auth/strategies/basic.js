const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');

const UsersService = require('../../../services/users');

passport.use(
  new BasicStrategy(async (email, password, callback) => {
    const usersService = new UsersService();

    try {
      const user = await usersService.getUser({ email });

      if (!user) {
        return callback(boom.unauthorized(), false);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return callback(boom.unauthorized(), false);
      }

      delete user.password;

      return callback(null, user);
    } catch (error) {
      callback(error);
    }
  })
);
