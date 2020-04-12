/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const { verify } = require('../helpers/auth');
const loanController = require('../controllers/loan');

router
  .get('/admin', verify, loanController.getLoan)
  .get('/:loan_id', verify, loanController.detailLoan)
  .post('/', verify, loanController.makeLoan)
  .patch('/:loan_id', verify, loanController.updateLoan)
  .delete('/:loan_id', verify, loanController.deleteLoan);

module.exports = router;
