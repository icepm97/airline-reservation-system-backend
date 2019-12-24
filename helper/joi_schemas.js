const Joi = require('joi')

const schemas  ={
    managementLoginPOST: Joi.object().keys({
        username:Joi.string().alphanum().required(),
        password:Joi.string().required()
    }),
    customerLoginPOST: Joi.object().keys({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    }),
}

module.exports = schemas