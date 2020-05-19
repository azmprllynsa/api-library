/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

router
  .get('/', userController.getUser)
  .get('/email-confirm', userController.userConfirm)
  .get('/admin/:user_id', userController.detailUser)
  .post('/register', userController.registerUser)
  .post('/login', userController.loginUser)
  .patch('/:user_id', userController.updateUser)
  .delete('/:user_id', userController.deleteUser);

module.exports = router;
