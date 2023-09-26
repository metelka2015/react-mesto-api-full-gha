// eslint-disable-next-line linebreak-style
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');
const router = require('./routes');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/users');
const handleError = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/corsMiddleware');

const { regExp, regEmail } = require('./utils/constants');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to DB');
  });

const app = express();

app.use(cors);

app.use(express.json());
app.use(helmet());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(regExp),
      email: Joi.string().required().pattern(regEmail),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(regEmail),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
