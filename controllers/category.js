const { Op } = require('sequelize');
const categories = require('../models').Category;
const helpers = require('../helpers/response');

module.exports = {
  getCategories: (async (req, res) => {
    let pagination = {};
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 5;
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


      const data = await categories.findAll(param);
      const count = await categories.count(searchParam);


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
        // client.setex('getallbooks', 3600, JSON.stringify(data));
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

  detailCategories: (async (req, res) => {
    let response = {};
    try {
      const categoryId = req.params.category_id;

      const data = await categories.findOne({ where: { id: categoryId } });

      if (!data) {
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

  createCategories: (async (req, res) => {
    let response = {};
    try {
      const { body } = req;
      const data = await categories.create(body);
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

  updateCategories: (async (req, res) => {
    let response = {};
    try {
      const categoryId = req.params.category_id;
      const input = req.body;
      // console.log(req.body);

      const [edit] = await categories.update(input, {
        where: {
          id: categoryId,
        },
      });
      const data = await categories.findOne({
        where: {
          id: categoryId,
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

  deleteCategories: (async (req, res) => {
    let response = {};
    try {
      const categoryId = req.params.category_id;

      const data = await categories.destroy({
        where: {
          id: categoryId,
        },
      });

      if (data) {
        response.status = 200;
        response.message = 'User Successfully Deleted';

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
