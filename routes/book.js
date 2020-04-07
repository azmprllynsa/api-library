/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
// const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: function(req, file, cb),
//   filename: ,
// })
const bookController = require('../controllers/book');


router
  .get('/', bookController.getBook)
  .get('/:book_id', bookController.detailBook)
  .post('/admin', bookController.insertBook)
  .post('/admin/:book_id', bookController.editBook)
  .delete('/admin/:book_id', bookController.deleteBook);

module.exports = router;
