const router = require('express').Router()
const management = require('../../models/management')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt')
const response = require('../../helper/response')

/*
login
email, password
jwt
*/
router.post('/login', (req, res) => {
    management.login(req.body.username, req.body.password)
    .then(result => {
        if (!result) {
            return response.error(res, 401, 'unauthorized', 'User credentials are invalid')
        }
        
        const token = jwt.sign({
            id: result.id,
            type: 'managemet'
        }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

        response.jwt(res, 200, result, token)
    })
    .catch(error => {
        response.error(res, 500, 'server_error', 'Server Error', error)
    })
    
})

module.exports = router

