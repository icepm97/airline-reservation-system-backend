const router = require('express').Router()
const ticket = require('../../models/ticket')
const response = require('../../helper/response')

router.get('/ticket/:id', (req, res) => {
    ticket.getTicketDetail(req.params.id)
    .then(result => {
        if(!result){
            return response.error(res, 401, 'unauthorized', 'Ticket is not there')
        }
        response.data(res, 200, result)
    })    
    
    .catch(error => {
        response.error(res, 401, 'server_error', 'Server Error', error)
    })
})

module.exports = router
