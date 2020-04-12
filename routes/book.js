/* eslint-disable linebreak-style */
const express = require('express');
// const redisHelper = require('../helpers/redis');

const router = express.Router();
const { verify } = require('../helpers/auth');
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
const { upload } = require('../helpers/upload');

// const upload = multer({
//   storage,
// });

router
  .get('/', bookController.getBook)
  .get('/:book_id', bookController.detailBook)
  .post('/admin', verify, upload.single('book_image'), bookController.insertBook)
  .patch('/admin/:book_id', verify, upload.single('book_image'), bookController.editBook)
  .delete('/admin/:book_id', verify, bookController.deleteBook);

module.exports = router;
