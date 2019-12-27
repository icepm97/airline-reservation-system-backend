const Joi = require("joi");

const schemas = {
  jwt: data =>
    Joi.object().keys({
      data: data,
      jwt: Joi.string().required()
    }),
  managementLoginPOST: Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .required(),
    password: Joi.string().required()
  }),
  customerLoginPOST: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
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
  flightSchedulePOST: Joi.object().keys({}),
  schedulePUT: Joi.object().keys({
    schedule_id: Joi.number().required(),
    state: Joi.string()
      .valid("on_time", "delay", "cancelled")
      .required(),
      departure_time_delay:Joi.when("state",{is:Joi.string().only("delay"),then:Joi.string().required()}),
      duration_delay:Joi.when("state",{is:Joi.string().only("delay"),then:Joi.string().required()})
  })
};

module.exports = schemas;
