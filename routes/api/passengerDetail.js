const router = require('express').Router()
const passengerDetail = require('../../models/passengerDetail')
const response = require('../../helper/response')

router.post('passengerDetail', (req, res) =>{
    passengerDetail.getPassenger(req.body.flight_id, req.body.date)
    .then(result => {
        if(!result){
            return response.error(res, 401, 'Invalid Input', 'Noone booking')
        }
        response.data(res, 200, result)
    })
    .catch(error => {
        response.error(res, 401, 'server_error', 'Server Error', error)
    })
})


router.get('/:destinaton/:start_date/:end_date', (req, res) =>{
    passengerDetailrange.getRequestedPassengers(req.body.destination, req.body.start_date, req.body.end_date)
    .then(result => {
        if(!result){
            return response.error(res, 409, 'Invalid Input', 'check inputs again')
        }
        response.data(res, 200, result)
    })
    .catch(error => {
        response.error(res, 500, 'server_error', 'Server Error', error)
    })
})


module.exports = router