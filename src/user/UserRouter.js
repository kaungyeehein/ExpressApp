const router = require('express').Router();
const idNumberControl = require('../shared/idNumberControl');
const pagination = require('../shared/pagination');
const UserService = require('./UserService');
const ValidationExecption = require('../shared/ValidationnException');

const { body, validationResult } = require('express-validator');

router.post('/users', [
  body('username').trim()
    .notEmpty().withMessage('username_null').bail()
    .isLength({ min: 4, max: 32 }).withMessage('username_size'),
  body('email').trim()
    .isEmail().withMessage('email_invalid').bail()
    .custom(async (email) => {
      const user = await UserService.findByEmail(email);
      if (user) {
        throw new Error('email_inuse');
      }
    })
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ValidationExecption(errors.array()));
    // return res.status(400).send(errors.array());
  }
  await UserService.create(req.body);
  res.send({ message: req.t('user_create_success') });
});

router.get('/users', pagination, async (req, res) => {
  const page = await UserService.getUsers(req.pagination);
  res.send(page);
});

router.get('/users/:id', idNumberControl, async (req, res, next) => {
  try {
    const user = await UserService.getUser(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.put('/users/:id', idNumberControl, async (req, res) => {
  await UserService.updateUser(req.params.id, req.body);
  res.send('updated');
});

router.delete('/users/:id', idNumberControl, async (req, res) => {
  await UserService.deleteUser(req.params.id);
  res.send('removed');
});

module.exports = router;