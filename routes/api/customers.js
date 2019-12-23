const router = require('express').Router()
const customer = require('../../models/customers')
const bcrypt = require('bcrypt')
const jwtConfig = require('../../config/jwt')
const response = require('../../helper/response')
const jwt = require('jsonwebtoken')

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
            type: 'customer'
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
router.post('/register', (req, res) => {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8)
    customer.register(req.body.email, hashedPassword, (error, result) => {
        if (error) {
            res.status(500).json({
                error: {
                    error: 'server_error',
                    message: 'There is a problem registering the customer'
                },
                data: []
            })
            return
        }
        // if (!result) {
        //     res.status(401).json({
        //         error: {
        //             error: 'unauthorized',
        //             message: 'User credentials are invalid'
        //         },
        //         data: []
        //     })
        //     return
        // }
        res.status(200).json({
            error: {},
            data: [{ id: result.id }]
        })
        console.log(result.id)
    })
})


module.exports = router

