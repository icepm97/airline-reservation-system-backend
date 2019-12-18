const router = require('express').Router()
const customer = require('../../models/customers')
const bcrypt = require('bcryptjs')

/*
login
email, password
*/
router.post('/login', (req, res) => {
    customer.login(req.body.email, req.body.password, (error, result) => {
        if (error) {
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
        res.status(200).json({
            error: {},
            data: [{ id: result.id }]
        })
        console.log(result.id)
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
        if (result.id=== '#already_register#') {
            res.status(401).json({
                error: {
                    error: 'unauthorized',
                    message: 'You have already registered'
                },
                data: []
            })
            return
        }
        res.status(200).json({
            error: {},
            data: [{ id: result.id }]
        })
        console.log(result.id)
    })
})


module.exports = router

