const Joi = require("joi");

const password = Joi.string()
  .min(3)
  .max(16)
  .required()

const schemas = {
  jwt: data =>
    Joi.object().keys({
      data: data,
      jwt: Joi.string().required()
    }),
  managementLoginPOST: Joi.object().keys({
    username: Joi.string()
      .max(50)
      .required(),
    password: password
  }),
  customerLoginPOST: Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .required(),
    password: password
  }),
  customerLoginPOST: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password:password
  }),
  customerRegisterPOST: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    first_name: Joi.string()
      .required(),
    last_name: Joi.string()
      .required(),
    gender: Joi.string()
      .valid('male', 'female')
      .required(),
    birthday: Joi.string()
      .isoDate()
      .required(),
    NIC: Joi.string()
      .max(15)
      .required(),
    country: Joi.string()
      .max(50)
      .required(),
    password: password
  }),
  flightPOST: Joi.object().keys({
    journey_duration: Joi.string().required(),
    departure_time: Joi.string().required(),
    route_id: Joi.number().required(),
    aircraft_model: Joi.number().required()
  }),
  flightDELETE: Joi.object().keys({
    flight_id: Joi.number().required()
  }),
  flightSchedulePOST: Joi.object().keys({})
};

module.exports = schemas;
