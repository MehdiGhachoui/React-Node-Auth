const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fetch = require('node-fetch');
const validate = require('../validation/joi').validate
const User = require('../models/User')

const { JWT_SECRET } = require('../config/jwt')
const { BCRYPT_WORK_FACTOR } = require('../config/auth')


router.post('/facebook-login', async (req, res) => {

  await validate(require('../validation/auth').facebookSchema, req.body)

  const { accessToken , userID} = req.body

  let urlFacebook = `https://graph.facebook.com/v2.11/${userID}?fields=id,name,email&access_token=${accessToken}`

  fetch(urlFacebook , {method:'GET'})
       .then(response=> response.json())
       .then( async (response) => {

             const {email , name} = response

             let user = await User.findOne({email})

             if(!user) {

               let password = await bcrypt.hash(email+JWT_SECRET, BCRYPT_WORK_FACTOR)

               let newUser = new User({
                 name,
                 email,
                 password,
                 isVerified : true

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

       })
})
module.exports = router ;
