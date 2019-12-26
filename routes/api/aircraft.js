const router = require("express").Router()
const route = require('../../models/aircraft')
const response = require('../../helper/response')

router.get("/models",(req,res)=>{
    route.getAircraftModels()
    .then(result => {
        response.data(res, 200, result)
    })
    .catch(error => {
        response.error(res, 500, 'server_error', 'Server Error', error)
    })
})


module.exports = router