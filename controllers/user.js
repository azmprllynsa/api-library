/* eslint-disable linebreak-style */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const models = require('../models');

const { user } = models;
const mail = require('../helpers/mail');
const helpers = require('../helpers/response');

module.exports = {
  getUser: (async (req, res) => {
    let response = {};
    try {
      const data = await user.findAll({
        exclude: ['password'],
      });


      if (data.length === 0) {
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

  detailUser: (async (req, res) => {
    let response = {};
    try {
      const userId = req.params.user_id;

      const data = await user.findOne({
        exclude: ['password'],
        where: { id: userId },
      });

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

  registerUser: (async (req, res) => {
    let response = {};
    try {
      const salt = bcrypt.genSaltSync(10);

      const data = await user.create({
        card_number: 1234567890,
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        phone: ' ',
        job: ' ',
        address: ' ',
        photo: 'photo.jpg',
        role_id: 'user',
        status: 0,
      });

      if (data === null) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.generic(res, response);
      } else {
        const encrypt = jwt.sign({ id: data.id, email: data.email }, process.env.SECRET_KEY);
        const dataEmail = {
          email: data.email,
          encrypt,
        };
        console.log('try to send email');
        mail.send(dataEmail);

        response.status = 201;
        response.message = 'Account has been created!';
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

  loginUser: (async (req, res) => {
    let response = {};
    try {
      const { email } = req.body;
      const data = await user.findOne({
        where: {
          email,
        },
      });
      if (data) {
        const authorized = bcrypt.compareSync(req.body.password, data.password);
        if (data.email !== email) {
          response.status = 404;
          response.message = 'Email Incorrect!';

          helpers.generic(res, response);
        }
        if (!authorized) {
          response.status = 404;
          response.message = 'Password Incorrect!';

          helpers.generic(res, response);
        }
        if (data.status !== 1) {
          response.status = 400;
          response.message = 'Your Account Need Email Confirmation!';

          helpers.generic(res, response);
        } else {
          const token = jwt.sign({ id: data.id, email }, process.env.SECRET_KEY);
          console.log(token);
          data.dataValues.token = token;
          console.log(data);
          response.status = 200;
          response.message = `${email} Login Successfully!`;
          response.data = data;

          helpers.generic(res, response);
        }
      }
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;

      helpers.generic(res, response);
    }
  }),

  updateUser: (async (req, res) => {
    let response = {};
    try {
      const salt = bcrypt.genSaltSync(10);
      const userId = req.params.user_id;
      const password = bcrypt.hashSync(req.body.password, salt);
      let { body } = req;
      body = Object.assign(body, { password });
      const data = await user.findOne({
        where: {
          id: userId,
        },
      });

      const [edit] = await user.update(body,
        {
          where: {
            id: userId,
          },
        });

      if (edit === 0) {
        response.status = 404;
        response.message = 'Data Not Found';

        helpers.generic(res, response);
      }
      if (edit === 1) {
        response.status = 200;
        response.message = 'User Data Successfully Edited';
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

  deleteUser: (async (req, res) => {
    let response = {};
    try {
      const userId = req.params.user_id;

      const data = await user.destroy({
        where: {
          id: userId,
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

  userConfirm: (async (req, res) => {
    let response = {};
    try {
      // const salt = bcrypt.genSaltSync(10);
      console.log(req.query.encrypt);
      const token = req.query.encrypt;
      const userId = jwt.verify(token, process.env.SECRET_KEY).id;
      console.log('here');
      const data = await user.findOne({
        where: {
          id: userId,
        },
      });

      const [edit] = await user.update({
        status: 1,
      },
      {
        where: {
          id: userId,
        },
      });

      if (edit === 0) {
        response.status = 404;
        response.message = 'Data Not Found';

        helpers.generic(res, response);
      }
      if (edit === 1) {
        response.status = 200;
        response.message = 'Email Has been confirm';
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
};
