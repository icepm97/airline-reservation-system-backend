const router = require('express').Router()
const response = require('../../../helper/response')
const model = require('../../../models/reports/revenuePerAircraftModel')

router.get('/', (req, res) => {
  model.getRevenuePerAircraftModel()
    .then(result => {
      response.data(res, 200, result)
    })
    .catch(error => {
      response.error(res, 500, 'server_error', 'Server Error', error)
    })
})

module.exports = router
