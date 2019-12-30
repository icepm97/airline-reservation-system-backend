const router = require('express').Router()
const ticket = require('../../models/ticket')
const response = require('../../helper/response')
const middlewareJWT = require("../../helper/jwt_middleware");
const types = require("../../config/types");
const middlewareJoi = require("../../helper/joi_middleware");
const schemas = require("../../helper/joi_schemas");

router.get('/:id',middlewareJoi(schemas.ticketGET,"query"),middlewareJWT(types.customer,"query"), (req, res) => {
    ticket.getTicketDetail(req.params.id)
    .then(result => {
        if(!result){
            return response.error(res, 404, 'not found', 'Ticket is not there')
        }
        response.data(res, 200, result)
    })    
    
    .catch(error => {
        response.error(res, 401, 'server_error', 'Server Error', error)
    })
})

module.exports = router
