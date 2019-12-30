const router = require('express').Router()
const passengerDetail = require('../../models/passengerDetail')
const response = require('../../helper/response')

router.get('/', (req, res) =>{
    passengerDetail.getPassenger(req.body.flight_id, req.body.date)
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


router.get('/:destination/:start_date/:end_date', (req, res) =>{
    passengerDetail.getRequestedPassengers(req.params.destination, req.params.start_date, req.params.end_date)
    .then(result => {
        response.data(res, 200, result)
    })
    .catch(error => {
        response.error(res, 500, 'server_error', 'Server Error', error)
    })
})


module.exports = router