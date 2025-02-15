const router = require('express').Router()
const passengerDetail = require('../../../models/reports/passengerDetail')
const response = require('../../../helper/response')
const middlewareJWT = require("../../../helper/jwt_middleware");
const types = require("../../../config/types");

router.get('/:flight_id/:date', middlewareJWT(types.management,"query"), (req, res) =>{
    passengerDetail.getPassenger(req.params.flight_id, req.params.date)
    .then(result => {
        if(!result){
            return response.error(res, 401, 'Invalid Input', 'None is booking')
        }
        response.data(res, 200, result)
    })
    .catch(error => {
        response.error(res, 401, 'server_error', 'Server Error', error)
    })
})


router.get('/:destination/:start_date/:end_date', middlewareJWT(types.management,"query"), (req, res) =>{
    passengerDetail.getRequestedPassengers(req.params.destination, req.params.start_date, req.params.end_date)
    .then(result => {
        response.data(res, 200, result)
    })
    .catch(error => {
        response.error(res, 500, 'server_error', 'Server Error', error)
    })
})


module.exports = router