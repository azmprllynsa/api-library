/* eslint-disable linebreak-style */
const express = require('express');
// const redisHelper = require('../helpers/redis');

const router = express.Router();
const { verify } = require('../helpers/auth');

const bookController = require('../controllers/index');
const { upload } = require('../helpers/upload');

router
  .get('/', bookController.bookController.getBook)
  .get('/:book_id', bookController.bookController.detailBook)
  .post('/admin', verify, upload.single('book_image'), bookController.bookController.insertBook)
  .patch('/admin/:book_id', verify, upload.single('book_image'), bookController.bookController.editBook)
  .delete('/admin/:book_id', verify, bookController.bookController.deleteBook);

module.exports = router;
