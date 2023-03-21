// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from '../../../../utils/connect'
import Transfers from '../../../../models/transfers'
import Users from '../../../../models/users';
import sendEmail from '../../../../utils/mailer';

export default async function handler(req, res) {
    const { from } = req.body;
    await con();
    const userOb = await Users.findOne({email:from})
    await Transfers.find({from:userOb.email})
    .then(transfers => res.json(transfers))
    .catch(err => res.status(400).json('Error: ' + err));

  }
