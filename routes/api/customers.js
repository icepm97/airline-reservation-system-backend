const router = require('express').Router()
const customer = require('../../models/customers')
const bcrypt = require('bcrypt')
const jwtConfig = require('../../config/jwt')
const response = require('../../helper/response')
const jwt = require('jsonwebtoken')
const types = require('../../config/types')
/*
login
email, password
*/
router.post('/login', (req, res) => {
    customer.login(req.body.email, req.body.password)
    .then(result => {
        if (!result) {
            return response.error(res, 401, 'unauthorized', 'User credentials are invalid')
        }
        
        const token = jwt.sign({
            id: result.id,
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
router.post('/', (req, res) => {
    customer.register(req.body.email, req.body.last_name, req.body.last_name, req.body.gender, req.body.birthday, req.body.NIC, 'new', req.body.password)
    .then(result => {
        if (!result) {
            return response.error(res, 409, 'invalid_input', 'Email already exist')
        }

        response.data(res, 201, [])
    })
    .catch(error => {
        response.error(res, 500, 'server_error', 'Server Error', error)
    })
})


module.exports = router

