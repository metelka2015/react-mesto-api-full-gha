/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/order
import { findOne } from '../models/user';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { constants } from 'http2';

import UnauthorizedError from '../utils/errors/unauthtorizedError';

require('dotenv').config();

const { HTTP_STATUS_OK } = constants;

const { NODE_ENV, JWT_SECRET } = process.env;

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
