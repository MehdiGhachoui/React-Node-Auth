const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validate = require('../validation/joi').validate
const {auth} = require('../config/auth')
const nodemailer = require('nodemailer')
const User = require('../models/User')

const { RESET_PASSWORD } = require('../config/jwt')
const { BCRYPT_WORK_FACTOR } = require('../config/auth')



router.post('/forgot-password', async (req, res) => {


  await validate(require('../validation/auth').forgotPasswordSchema, req.body)

  const { email } = req.body
  const user = await User.findOne({ email })

  if (user) {

    let payload = { user : { id : user.id } }

    let token =  await jwt.sign(payload , RESET_PASSWORD , {expiresIn : 36000})

    let updateLink = await user.updateOne({resetLink : token})

    if (updateLink)  {

      let transporter = nodemailer.createTransport({ service: 'gmail', host: 'smtp.gmail.com', auth: { user: auth.email , pass: auth.pass } });
      let mailOptions = { from: 'no-reply@yourwebapplication.com', to: user.email, subject: 'Account Password Reset', text: 'Hello,\n\n' + 'Please reset your password by clicking : \nhttp:\/\/localhost:3000\/reset-password?token=' + token + '.\n' };


      if(await transporter.sendMail(mailOptions)) return res.status(200).json({ msg: 'you will receive an email with a link to reset your password' })

      else return res.status(400).json({ msg: 'email was not sent' })

    }  else return res.status(400).json({ msg: 'User not found' })




  }


  else  res.status(400).json({ msg: 'User not  Found' })


})



router.post('/reset-password', async ({ query, body }, res) => {

  await validate(require('../validation/auth').resetPasswordSchema, { query, body })

  const { token } = query
  const { email ,  password } = body


  let verify = jwt.verify(token , RESET_PASSWORD);

  if (!verify) {
    return res.status(400).json({ msg: 'token expired' })
  }


  let user = await User.findOne({email})

  if(!user) return res.status(400).json({ msg: 'User don\'t exist' })

  user.password =  await bcrypt.hash(password, BCRYPT_WORK_FACTOR)

  if(await user.save()) return res.status(200).json({ msg: 'Password has been changed' })


})


module.exports = router ;
