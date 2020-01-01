const router = require('express').Router()
const getCustomerType = require('../../../models/reports/customerType')
const response = require('../../../helper/response')
const middlewareJWT = require("../../../helper/jwt_middleware");
const types = require("../../../config/types");

router.get('/:start_date/:end_date', middlewareJWT(types.management,"query"), (req, res) =>{
    getCustomerType.getcustomerType(req.params.start_date, req.params.end_date)
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
