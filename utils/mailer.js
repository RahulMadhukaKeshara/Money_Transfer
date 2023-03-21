import nodemailer from 'nodemailer';

// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//   service:'gmail',
//   auth: {
//     user: 'rahulkeshara@gmail.com',
//     pass: 'aiqwyervporedpds',
//   },
// });
export const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:process.env.GMAIL_EMAIL_ADDRESS,
    pass:process.env.GMAIL_APP_PASSWORD
  }
})

export const mailOptions={
  from:process.env.GMAIL_EMAIL_ADDRESS
}

export default async function sendEmail({ from, to, subject, text ,html}) {
  const mailOptions = {
    from,
    to,
    subject,
    text,
    html
  };

  return await transporter.sendMail(mailOptions);

}

