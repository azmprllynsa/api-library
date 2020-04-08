/* eslint-disable linebreak-style */
const express = require('express');
// const redisHelper = require('../helpers/redis');

const router = express.Router();
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename(req, file, cb) {
//     cb(null, new Date().toISOString + file.originalname);
//   },
// });
const bookController = require('../controllers/book');

// const upload = multer({
//   storage,
// });

router
  .get('/', bookController.getBook)
  .get('/:book_id', bookController.detailBook)
  .post('/admin', bookController.insertBook)
  .post('/admin/:book_id', bookController.editBook)
  .delete('/admin/:book_id', bookController.deleteBook);

module.exports = router;
