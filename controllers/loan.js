/* eslint-disable linebreak-style */
const { loan, book, user } = require('../models');
const helpers = require('../helpers/response');

module.exports = {
  makeLoan: (async (req, res) => {
    let response = {};
    try {
      const { body } = req;
      const data = await loan.create(body);
      if (data === undefined) {
        response.status = 400;
        response.message = 'Input Invalid';

        helpers.generic(res, response);
      } else {
        response.status = 201;
        response.message = 'Book Has Been Added';
        response.data = data;

        helpers.generic(res, response);
      }
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;

      helpers.generic(res, response);
    }
  }),

  getLoan: (async (req, res) => {
    let response = {};
    try {
      const data = await loan.findAll({
        include: [
          { model: book, as: 'book', attributes: ['title'] },
          { model: user, as: 'user', attributes: ['fullname'] },
        ],
      });

      if (data === null) {
        response.status = 404;
        response.message = 'Data Not Found';
        process.env
          .helpers.generic(res, response);
      }

      response.status = 200;
      response.message = 'OK';
      response.data = data;

      helpers.generic(res, response);
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;

      helpers.generic(res, response);
    }
  }),

  detailLoan: (async (req, res) => {
    let response = {};
    try {
      const loanId = req.params.loan_id;

      const data = await loan.findOne({
        include: [
          { model: book, as: 'book', attributes: ['title'] },
          { model: user, as: 'user', attributes: ['fullname'] },
        ],
        where: { id: loanId },
      });

      if (data === null) {
        response.status = 404;
        response.message = 'Data Not Found';

        helpers.generic(res, response);
      } else {
        response.status = 200;
        response.message = 'OK';
        response.data = data;

        helpers.generic(res, response);
      }
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;

      helpers.generic(res, response);
    }
  }),

  updateLoan: (async (req, res) => {
    let response = {};
    try {
      const loanId = req.params.loan_id;
      const input = req.body;
      // console.log(req.body);

      const [edit] = await loan.update(input, {
        where: {
          id: loanId,
        },
      });
      const data = await loan.findOne({
        where: {
          id: loanId,
        },
      });

      if (edit === 1) {
        response.status = 200;
        response.message = 'Book Successfully Edited';
        response.data = data;

        helpers.generic(res, response);
      }
      if (edit === 0) {
        response.status = 404;
        response.message = 'Data Not Found';

        helpers.generic(res, response);
      }
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;

      helpers.generic(res, response);
    }
  }),

  deleteLoan: (async (req, res) => {
    let response = {};
    try {
      const loanId = req.params.loan_id;
      const data = await loan.destroy({
        where: {
          id: loanId,
        },
      });
      if (data) {
        response.status = 200;
        response.message = 'Successfully Deleted';

        helpers.generic(res, response);
      } else {
        response.status = 404;
        response.message = 'Data Not Found';

        helpers.generic(res, response);
      }
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;

      helpers.generic(res, response);
    }
  }),

};
