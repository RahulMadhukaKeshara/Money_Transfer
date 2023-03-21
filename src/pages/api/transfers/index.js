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
        await Transfers.create({
          from: from,
          to: to,
          amount: amount,
          date: date,
        })

        await sendEmail({
          from: process.env.GMAIL_EMAIL_ADDRESS,
          to: to,
          subject: `Money Received`,
          text: "",
          html:`<p>Dear Sir/Madam,</p><p>You have received <strong>Rs. ${amount}</strong> by  <strong>${userOb.fname} ${userOb.lname}</strong> on <strong>${date}</strong>.</p>`
        })
        return res.status(200).json('Transfer Success!')
      } catch (error) {
        console.log(error)
        return res.status(400).json({message:error.message})
      }
    
    } catch (error) {
      return res.status(400).json({message:error.message})
    }



  }
}
