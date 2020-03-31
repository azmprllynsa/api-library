/* eslint-disable linebreak-style */
const { Op } = require('sequelize');
const books = require('../models').book;
const helpers = require('../helpers/response');

module.exports = {
  getBook: (async (req, res) => {
    let pagination = {};
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 3;
      const path = `${req.get('host') + req.baseUrl}?page`;
      const { search } = req.query;
      const offset = (page * limit) - limit;
      const param = {};
      let searchParam = {};
      const { sort } = req.query;
      if (search !== undefined) {
        const where = {
          [Op.or]: [
            { title: { [Op.substring]: search } },
            { description: { [Op.substring]: search } },
          ],
        };

        param.where = where;
        searchParam = { where };
      }
      let sortType = req.query.sort_type || '';
      sortType = sortType.toUpperCase() || 'ASC';
      if (sort !== undefined) {
        // eslint-disabl-line no-multi-assign
        // eslint-disable-next-line no-multi-assign
        param.order = [[sort, sortType]];
      }
      param.offset = offset;
      param.limit = limit;


      const data = await books.findAll(param);
      const count = await books.count(searchParam);


      pagination = {
        current_page: page,
        offset,
        limit,
        total_data: count,
        per_page: data.length,
        path,
      };
      if (data.length !== 0) {
        pagination.status = 200;
        pagination.message = 'success';
        pagination.data = data;
        helpers.pagination(res, req.query, pagination);
      } else {
        pagination.status = 404;
        pagination.message = 'Data not found';
        helpers.pagination(res, req.query, pagination);
      }
    } catch (err) {
      pagination = {};
      helpers.pagination(res, req.query, pagination);
    }
  }),

  detailBook: (async (req, res) => {
    let response = {};
    try {
      const bookId = req.params.book_id;
      const data = await books.findOne({
        where: {
          id: bookId,
        },
      });
      if (data === null) {
        response.status = 404;
        response.message = 'Data Not Found';

        helpers.generic(res, response);
      }

      response.status = 200;
      response.message = 'OK';
      response.data = data;

      helpers.generic(res, response);
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';

      helpers.generic(res, response);
    }
  }),

  insertBook: (async (req, res) => {
    let response = {};

    try {
      const { body } = req;
      // eslint-disable-next-line max-len
      if (await body.title === null || body.description === null || body.author === null) {
        response.status = 400;
        response.message = 'Input Invalid';

        helpers.generic(res, response);
      } else {
        const data = await books.create(body);

        response.status = 201;
        response.message = 'Book Has Been Added';
        response.data = data;

        helpers.generic(res, response);
      }
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';

      helpers.generic(res, response);
    }
  }),

  editBook: (async (req, res) => {
    let response = {};
    try {
      const bookId = req.params.book_id;
      const input = req.body;
      // console.log(req.body);

      const [edit] = await books.update(input, {
        where: {
          id: bookId,
        },
      });
      const data = await books.findOne({
        where: {
          id: bookId,
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

      helpers.generic(res, response);
    }
  }),

  deleteBook: (async (req, res) => {
    let response = {};
    try {
      const bookId = req.params.book_id;
      const data = await books.destroy({
        where: {
          id: bookId,
        },
      });
      if (data) {
        response.status = 200;
        response.message = `Book ID ${bookId} Successfully Deleted`;

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

      helpers.generic(res, response);
    }
  }),
};
