import nodemailer from 'nodemailer';

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'rahulkeshara@gmail.com',
    pass: 'aiqwyervporedpds',
  },
});

export default async function sendEmail(to, subject, body) {
  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'rahulkeshara@gmail.com',
      to: to,
      subject: subject,
      html: body,
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error(error);
  }
}



// const nodemailer = require('nodemailer');
// const sgTransport = require('nodemailer-sendgrid-transport');

// const transporter = nodemailer.createTransport(
//   sgTransport({
//     auth: {
//       api_key: process.env.SENDGRID_API_KEY,
//     },
//   })
// );

// export default async function sendEmail({ from, to, subject, text }) {
//   const mailOptions = {
//     from,
//     to,
//     subject,
//     text,
//   };

//   return await transporter.sendMail(mailOptions);
// }
