const router = require('express').Router()
const getCustomerType = require('../../models/customerType')
const response = require('../../../helper/response')

router.get('/', (req, res) =>{
    getCustomerType.getcustomerType(req.body.start_date, req.body.end_date)
    .then(result => {
        if(!result){
            return response.error(res, 401, 'Invalid Input', 'There is no booking in this data range')
        }
        response.data(res, 200, result)
    })
    .catch(error => {
        response.error(res, 401, 'server_error', 'Server Error', error)
    })
})

module.exports = router
