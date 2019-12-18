const router = require('express').Router()
const customer = require('../../models/management')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')

/*
login
email, password, type{management, customer}
jwt
*/
router.post('/login', (req, res) => {
    customer.login(req.body.username, req.body.password, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).json({
                error: {
                    error: 'server_error',
                    message: 'Server Error'
                },
                data: []
            })
            return
        }
        if (!result) {
            res.status(401).json({
                error: {
                    error: 'unauthorized',
                    message: 'User credentials are invalid'
                },
                data: []
            })
            return
        }
        
        const token = jwt.sign({
            id: result.id,
            type: 'customer'
        }, 'secret', { expiresIn: '1h' });
        res.status(200).json({
            error: {},
            data: [{ 
                jwt: token,
                id: result.id 
            }]
        })
        console.log(result.id)
    })
})

module.exports = router

