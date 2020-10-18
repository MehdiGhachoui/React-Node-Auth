const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const proxy = require('../middelware').proxy
const auth = require('../middelware').auth
const validate = require('../validation/joi').validate
const User = require('../models/User')


const { JWT_SECRET } = require('../config/jwt')



router.post('/login', proxy , async (req , res) => {

       await validate(require('../validation/auth').loginSchema, req.body)


       const { email, password } = req.body

       const user = await User.findOne({ email })

       if (!user || !(await bcrypt.compare(password, user.password ) )){
         return res.status(400).json({msg:'Incorrect email or password'})
       }


       else {

         // CREATING THE WEBTOKEN :

          let payload = { user : { id : user.id } }
          let token   =  await jwt.sign(payload , JWT_SECRET , {expiresIn : 36000})

          if (token) {
            return res.status(200).json({token})
          }
          else  res.status(400).json({msg : 'token error'})


       }


});





module.exports = router ;
