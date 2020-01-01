const router = require('express').Router()

router.use('/revenuePerAircraftModel', require('./revenuePerAircraftModel'))
router.use('/passengerDetail', require('./passengerDetail'))
router.use('/customerType', require('./customerType'))

module.exports = router
