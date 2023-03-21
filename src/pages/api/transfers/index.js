// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from '../../../../utils/connect'
import Transfers from '../../../../models/transfers'
import Users from '../../../../models/users';
import sendEmail from '../../../../utils/mailer';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { from } = req.body;
    await con();
    const userOb = await Users.findOne({ email: from })
    await Transfers.find({ from: userOb.email }).then(transfers => res.json(transfers)).catch(err => res.status(400).json('Error: ' + err));

  } else if (req.method === 'POST') {

    try {
      const { from, to, amount, date } = req.body;
      await con();
      const userOb = await Users.findOne({ email: from })
      try {
        await sendEmail({
          to:to,
          subject:'subject',
          body:'body'
        })
        console.log('Email Sent')
      } catch (error) {
        console.log(error)
      }

      // console.log(req.body);
      // await Transfers.create({
      //   from: from,
      //   to: to,
      //   amount: amount,
      //   date: date,
      // })
      // .then(() => res.json('Transfer Success!'))
      // .catch(err => res.status(400).json('Error: ' + err));
      // await sendEmail({
      //   from: process.env.EMAIL_ADDRESS,
      //   to: to,
      //   subject: `Money Received`,
      //   text: `You have received Rs. ${amount} by  ${userOb.fname} ${userOb.lname} on ${date}.`,
      // }).then(console.log('Email Sent'))

      
  
    } catch (error) {
      console.error('Error :', error);
    }



  }
}
