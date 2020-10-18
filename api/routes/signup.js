const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const proxy = require('../middelware').proxy
const validate = require('../validation/joi').validate
const nodemailer = require('nodemailer')
const {auth} = require('../config/auth')
const User = require('../models/User')

const { RESET_PASSWORD , JWT_SECRET } = require('../config/jwt')
const { BCRYPT_WORK_FACTOR } = require('../config/auth')


router.post('/register',   proxy , async (req, res) => {


  await validate(require('../validation/auth').registerSchema, req.body)

  const { email, name, password } = req.body

  const found = await User.findOne({ email:email })

  

  if (found) {
    return res.status(400).json({msg :'Email alredy exist'})
  }

  else {


      let user = new User({ email, name, password})

      user.password = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)

      if (await user.save()) {

        let payload = { user : { id : user.id } }
        let token   =  await jwt.sign(payload , JWT_SECRET , {expiresIn : 36000})

        if (!token)   return res.status(400).json({msg : 'token error'})

        let transporter = nodemailer.createTransport({ service: 'gmail', host: 'smtp.gmail.com', auth: { user: auth.email , pass: auth.pass } });
        let mailOptions = { from: 'no-reply@yourwebapplication.com', to: user.email, subject: 'Account Verification', text: 'Hello,\n\n' + 'Please verify  your account  by clicking : \nhttp:\/\/localhost:3000\/activate?token=' + token + '.\n' };

        if(await transporter.sendMail(mailOptions)) return  res.status(200).json({msg : 'a verification email has been sent to your account'})

        else return res.status(400).json({msg : 'email was not sent'})

      }

  }


})


module.exports = router ;
