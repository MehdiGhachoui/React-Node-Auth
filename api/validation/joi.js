const mongoose = require('mongoose')
const joi = require('@hapi/joi')

const objectId = joi => ({
  type: 'objectId',
  base: joi.string(),
  messages: {
    objectId: '"{#label}" is not a valid ID'
  },
  validate (value, helpers) {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return { value, errors: helpers.error('objectId') }
    }
  }
})


module.exports.Joi = joi.extend(objectId)

module.exports.validate = async (schema, payload) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false })
  } catch (e) {

    throw new Error(e)
  }
}
