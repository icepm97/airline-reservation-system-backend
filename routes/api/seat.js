const router = require('express').Router()
const seat = require('../../models/seat')
const response = require('../../helper/response')
const middlewareJWT = require("../../helper/jwt_middleware");
const types = require("../../config/types");
const middlewareJoi = require("../../helper/joi_middleware");
const schemas = require("../../helper/joi_schemas");

router.get('/',middlewareJoi(schemas.seatGET,"query"),middlewareJWT([types.customer,types.guest],"query"), (req, res) => {
    seat.getSeats(req.user_id, req.query.schedule_id)
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
