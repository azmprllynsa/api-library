const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
  send: (data) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    // eslint-disable-next-line prefer-const
    let response = [];
    const link = `Click <a href="${process.env.URL_EMAIL_CONFIRM}?encrypt=${data.encrypt}"></a>`;
    const mailOptions = {
      from: process.env.EMAIL,
      to: data.email,
      subject: 'Email Confirmation',
      text: link,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
        response.message = 'email failed';
      } else {
        response.error = false;
        response.message = 'Successfully send email nodemailer';
      }
    });
    return response;
  },


};
