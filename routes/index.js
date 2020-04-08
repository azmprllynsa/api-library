/* eslint-disable linebreak-style */
const express = require('express');
const book = require('./book');
const user = require('./user');
const loan = require('./loan');
const category = require('./category');

const router = express.Router();

router
  .use('/book', book)
  .use('/user', user)
  .use('/loan', loan)
  .use('/categories', category);


module.exports = router;
