const router = require('express').Router()

router.use('/revenue-per-aircraftModel', require('./revenuePerAircraftModel'))
router.use('/passenger-detail', require('./passengerDetail'))
router.use('/customer-type', require('./customerType'))

module.exports = router
