const router = require('express').Router()
const flightBookingDetail = require('../../models/flightBookingDetail')
const response = require('../../helper/response')
const middlewareJWT = require("../../helper/jwt_middleware");
const types = require("../../config/types");

router.get('/:flight_id/:date', middlewareJWT(types.management,"query"),(req, res) =>{
    flightBookingDetail.getBookingDetails(req.params.flight_id, req.params.date)
    .then(result => {
        if(!result){
            return response.error(res, 401, 'Invalid Input', 'Noone is booking')
        }
        response.data(res, 200, result)
    })
    .catch(error => {
        response.error(res, 401, 'server_error', 'Server Error', error)
    })
})

module.exports = router