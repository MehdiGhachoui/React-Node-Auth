const  Joi  = require('./joi').Joi
const {
  BCRYPT_MAX_BYTES,
  EMAIL_VERIFICATION_TOKEN_BYTES,
  EMAIL_VERIFICATION_SIGNATURE_BYTES,
  PASSWORD_RESET_BYTES
} = require('../config/auth')

const id = Joi.objectId().required()

const email = Joi.string().email().min(8).max(254).lowercase().trim().required()

const name = Joi.string().min(3).max(128).trim().required()

const password = Joi.string().min(8).max(BCRYPT_MAX_BYTES, 'utf8').required()

const passwordConfirmation = Joi.valid(Joi.ref('password')).required()

const remember_me = Joi.string()

module.exports.registerSchema = Joi.object({
  email,
  name,
  password,
  passwordConfirmation ,

})


module.exports.loginSchema = Joi.object({
  email,
  password,
  remember_me
})


module.exports.forgotPasswordSchema = Joi.object({
  email
})


module.exports.resetPasswordSchema = Joi.object({
  query: Joi.object({
    token: Joi.string().required()
  }),
  body: Joi.object({
    email,
    password,
    passwordConfirmation
  })
})


module.exports.verifyEmailSchema = Joi.object({

    token: Joi.string().required()

})


module.exports.googleSchema = Joi.object({

  tokenId: Joi.string().required()

})


module.exports.facebookSchema = Joi.object({

  accessToken: Joi.string().required(),
  userID: Joi.string().required()

})
