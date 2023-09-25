/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/order
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { HTTP_STATUS_OK } = require('http2').constants;
const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../utils/errors/unauthtorizedError');
const userModel = require('../models/user');
const { HTTP_STATUS_OK } = require('http2').constants;


const login = (req, res, next) => {
  const { email, password } = req.body;

  findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Пользователь не найден');
      }

      return (
        compare(password, user.password)
          // eslint-disable-next-line consistent-return
          .then((matched) => {
            if (!matched) {
              // хеши не совпали — отклоняем
              throw new UnauthorizedError('Неправильные почта или пароль');
            }
            const token = sign(
              { _id: user._id },
              NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
              {
                expiresIn: '7d',
              },
            );
            res.status(HTTP_STATUS_OK).send({ token });
          })
          .catch(next)
      );
    })
    .catch(next);
};

export default { login };
