const Joi = require("joi");

const password = Joi.string()
  .min(3)
  .max(16)
  .required();

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
    email: Joi.string()
      .email()
      .required(),
    password: password
  }),
  customerRegisterPOST: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    gender: Joi.string()
      .valid("male", "female")
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
  flightSchedulePOST: Joi.object().keys({}),
  schedulePUT: Joi.object().keys({
    schedule_id: Joi.number().required(),
    state: Joi.string()
      .valid("on_time", "delay", "cancelled")
      .required(),
    departure_time_delay: Joi.when("state", {
      is: Joi.string().only("delay"),
      then: Joi.string().required()
    }),
    duration_delay: Joi.when("state", {
      is: Joi.string().only("delay"),
      then: Joi.string().required()
    })
  }),
  seatGET: Joi.object().keys({
    aircraft_model_id: Joi.number().required(),
    jwt: Joi.string().required()
  }),
  bookingPOST: Joi.object().keys({
    date: Joi.string()
      .isoDate()
      .required(),
    flight_id: Joi.number().required(),
    tickets: Joi.array().items(
      Joi.object().keys({
        seat_id: Joi.number().required(),
        passenger: Joi.object().keys({
          first_name: Joi.string().required(),
          last_name: Joi.string().required(),
          gender: Joi.string()
            .valid("male", "female")
            .required(),
          birthday: Joi.string()
            .isoDate()
            .required(),
          passport_no: Joi.string().required(),
          email: Joi.string()
            .email()
            .required(),
          country: Joi.string().required()
        })
      })
    )
  })
};

module.exports = schemas;
