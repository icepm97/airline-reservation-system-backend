const router = require("express").Router()
const flight = require('../../models/flight')
const response = require('../../helper/response')
const middlewareJWT = require("../../helper/jwt_middleware")
const types = require('../../config/types')

router.post("/",middlewareJWT(types.management),(req,res)=>{
    flight.addFlight(req.body.data)
    .then(result => {
        response.data(res, 200, {message:"Successfully added"})
    })
    .catch(error => {
        response.error(res, 500, 'server_error', 'Server Error', error)
    })
})

module.exports = router
