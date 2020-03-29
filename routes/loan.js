const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loan');

router
	.get('/admin', loanController.getLoan)
	.get('/:loan_id', loanController.detailLoan)
	.post('/', loanController.makeLoan)
	.patch('/:loan_id', loanController.updateLoan)
	.delete('/:loan_id', loanController.deleteLoan)

module.exports = router;