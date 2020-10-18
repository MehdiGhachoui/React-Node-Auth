const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {OAuth2Client} = require('google-auth-library')
const validate = require('../validation/joi').validate
const User = require('../models/User')

const { JWT_SECRET } = require('../config/jwt')
const { BCRYPT_WORK_FACTOR } = require('../config/auth')


const client = new OAuth2Client("344224742210-4su6u02cd7slaldpm8ppn4f08ksq6k3a.apps.googleusercontent.com")

router.post('/google-login', async (req, res) => {

  await validate(require('../validation/auth').googleSchema, req.body)

  const { tokenId } = req.body

  let response = await client.verifyIdToken({idToken : tokenId , audience : "344224742210-4su6u02cd7slaldpm8ppn4f08ksq6k3a.apps.googleusercontent.com"})

  const {email_verified , name , email} = response.payload

  if(email_verified){

     let user = await User.findOne({email})

     if(!user) {

       let password = await bcrypt.hash(email+JWT_SECRET, BCRYPT_WORK_FACTOR)

       let newUser = new User({
         name,
         email,
         password,
         isVerified : email_verified

       })

       let rslt = await newUser.save()
       
       if (rslt) {

         let token =  await jwt.sign({ user : { id : rslt.id } } , JWT_SECRET , {expiresIn : 36000})

         return res.status(200).json({token})
       }

     }
     else {

       let token =  await jwt.sign({ user : { id : user.id } } , JWT_SECRET , {expiresIn : 36000})

       return res.status(200).json({token})
     }


  }



})

module.exports = router ;
