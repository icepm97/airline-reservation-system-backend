const router = require('express').Router()
const customer = require('../../models/customers')
const bcrypt = require('bcrypt')
const jwtConfig = require('../../config/jwt')
const response = require('../../helper/response')
const jwt = require('jsonwebtoken')
const middlewareJoi = require("../../helper/joi_middleware")
const schemas = require("../../helper/joi_schemas")
const types = require('../../config/types')


/*
login
email, password
*/
router.post('/login', middlewareJoi(schemas.customerLoginPOST), (req, res) => {
    customer.login(req.body.email, req.body.password)
    .then(result => {
        if (!result) {
            return response.error(res, 401, 'unauthorized', 'User credentials are invalid')
        }
        
        const token = jwt.sign({
            id: result.customer_id,
            type: types.customer
        }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

        response.jwt(res, 200, result, token)
    })
    .catch(error => {
        response.error(res, 500, 'server_error', 'Server Error', error)
    })
})


/*
register
*
*/
router.post('/', middlewareJoi(schemas.customerRegisterPOST), (req, res) => {
    customer.register(req.body.email, req.body.first_name, req.body.last_name, req.body.gender, req.body.birthday, req.body.NIC, req.body.country, req.body.password)
    .then(result => {
        if (!result) {
            return response.error(res, 409, 'invalid_input', 'Email already exists')
        }

        response.data(res, 201, [])
    })
    .catch(error => {
        response.error(res, 500, 'server_error', 'Server Error', error)
    })
})


module.exports = router

