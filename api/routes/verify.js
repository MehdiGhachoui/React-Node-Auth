const router = require('express').Router()
const validate = require('../validation/joi').validate
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/jwt')
const User = require('../models/User')

router.post('/email-verify', async (req, res) => {

  await validate(require('../validation/auth').verifyEmailSchema, req.query)

  let { token } = req.query


  let {user} = await jwt.verify(token , JWT_SECRET)


  let newUser = await User.findById(user.id).select('isVerified')


  if (newUser.isVerified) {

    return res.status(400).json({msg :'Email already verified'})

  }

  else newUser.isVerified = true

  if (await newUser.save()) {
    return res.status(200).json({msg : 'User has been verified'})
  }


})


module.exports = router ;
