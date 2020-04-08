/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const categoriesController = require('../controllers/category');

router
  .get('/', categoriesController.getCategories)
  .get('/:category_id', categoriesController.detailCategories)
  .post('/admin', categoriesController.createCategories)
  .patch('/admin/:category_id', categoriesController.updateCategories)
  .delete('/admin/:category_id', categoriesController.deleteCategories);

module.exports = router;
