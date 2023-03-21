// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// let jwtDecode = require('jwt-decode')

import con from '../../../utils/connect'
import Users from '../../../models/users'

export default async function handler(req, res) {

      const {fname , lname , contact , email , password} = req.body;
      await con();

      try {

        //Check Current Users
        let user = await Users.findOne({ email:email});
        if(user) return res.status(400).send('Already Registered')
    
        //Create New User
    
        const newUser = new Users({
            fname,
            lname,
            contact,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(newUser.password, salt)
    
        // //Set Token
        // const token = jwt.sign({_id : newUser._id, email: newUser.email , fname:newUser.fname , lname:newUser.lname},  process.env.jwtKey);
    
        // //send verification email
        // let details = {
        //     verifyLink : token,
        //     userEmail : newUser.email,
        // }
        // accountVerification(details);
        await newUser.save();
        res.status(200).json('Succesfully Signed Up')

        } catch (error) {
           res.status(400).json('Error: '+ error)
        }

  
}
