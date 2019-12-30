const router = require('express').Router()
const booking = require('../../models/booking')
const response = require('../../helper/response')
const middlewareJWT = require("../../helper/jwt_middleware");
const types = require("../../config/types");
const middlewareJoi = require("../../helper/joi_middleware");
const schemas = require("../../helper/joi_schemas");


router.get('/:booking_id', middlewareJWT(types.customer), (req, res) => {
  booking.getBookingTickets(req.user_id, req.params.booking_id)
    .then(result => {
      response.data(res, 200, result) 
    })
    .catch(error => {
      response.error(res, 500, 'server_error', 'Server Error', error)
    })
})


router.get('/', middlewareJWT(types.customer), (req, res) => {
  booking.getCustomerBookings(req.user_id)
    .then(result => {
      response.data(res, 200, result) 
    })
    .catch(error => {
      response.error(res, 500, 'server_error', 'Server Error', error)
    })
})


router.post('/', middlewareJoi(schemas.jwt(schemas.bookingPOST)), middlewareJWT(types.customer), (req, res) => {
  booking.create(req.user_id, req.body.data.date, req.body.data.flight_id, req.body.data.tickets)
    .then(result => {
      response.data(res, 201, [{booking_id: result}])
    })
    .catch(error => {
      response.error(res, 500, 'server_error', 'Server Error', error)
    })
})


module.exports = router