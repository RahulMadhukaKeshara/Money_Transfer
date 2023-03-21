// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// let jwtDecode = require('jwt-decode')

import con from '../../../utils/connect'
import Users from '../../../models/users'

export default async function handler(req, res) {

    const {email , password } = req.body;
    await con();

    try {
    //Check Current Users
    let user = await Users.findOne({ email:email});
    if(!user) return res.json({warn:'Invalid email'})

    //check password
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword) return res.json({warn:'Invalid Password'})

    //Set Token
    const token = jwt.sign({_id : user._id, email: user.email , fname:user.fname , lname:user.lname},  process.env.jwtKey);

    //Response

    res.status(200)
    .setHeader("Access-Control-Allow-Headers", "x-access-token, mytoken")
    .json({
        jwt: token,
        msg: 'Signed In Successfully',
    }) ;

    } catch (error) {
        res.status(400).json('Error: '+ error)
    }


  
}
