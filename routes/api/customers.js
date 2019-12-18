const router = require('express').Router()
const customer = require('../../models/customers')


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
        res.send(result.id)
    })
})


/*
register
*
*/
router.post('/', (req, res) => {
    customer.register(req.body.email ,req.body.first_name ,req.body.last_name ,req.body.gender ,req.body.birthday ,req.body.NIC ,req.body.category ,req.body.password, (error, result) => {
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

