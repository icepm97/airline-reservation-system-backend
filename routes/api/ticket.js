const router = require('express').Router()
const ticket = require('../../models/ticket')
const response = require('../../helper/response')
const middlewareJWT = require("../../helper/jwt_middleware");
const types = require("../../config/types");
const middlewareJoi = require("../../helper/joi_middleware");
const schemas = require("../../helper/joi_schemas");

<<<<<<< HEAD
router.get('/ticket/:id',middlewareJoi(schemas.jwtGET,"query"),middlewareJWT(types.customer,"query"), (req, res) => {
=======
router.get('/:id',middlewareJoi(schemas.ticketGET,"query"),middlewareJWT(types.customer,"query"), (req, res) => {
>>>>>>> f01fc0d2620af955c144a8981a99b7e3ab59ad6a
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
