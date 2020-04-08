/* eslint-disable linebreak-style */
require('dotenv').config();
const redis = require('redis');
const helpers = require('./response');

const client = redis.createClient(process.env.PORT_REDIS);

module.exports = {
  cacheGetAllbooks: (req, res, next) => {
    client.get('getallbooks', (err, data) => {
      if (err) {
        helpers.pagination(res, req.query);
      }

      if (data !== null) {
        helpers.pagination(res, req.query);
      } else {
        next();
      }
    });
  },

  clearGetAllbooks: (req, res, next) => {
    client.del('getallbooks');
    next();
  },
};
