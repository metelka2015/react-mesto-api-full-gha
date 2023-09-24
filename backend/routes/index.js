/* eslint-disable linebreak-style */
const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/notFoundError');

router.use('/api/users', auth, userRouter);
router.use('/api/cards', auth, cardRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Page not found'));
});

module.exports = router;
