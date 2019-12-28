const router = require('express').Router()
const seat = require('../../models/seat')
const response = require('../../helper/response')

router.get('/seat', (req, res) => {
    seat.getSeats(req.query.aircraft_model)
    .then(result => {
        if(!result){
            return response.error(res, 404, 'not found', 'Aircraft not found')
        }
        response.data(res, 200, result)
    })    
    
    .catch(error => {
        response.error(res, 401, 'server_error', 'Server Error', error)
    })
})

module.exports = router
