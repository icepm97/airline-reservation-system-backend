const router = require('express').Router()

router.use('/customers', require('./customers'))
router.use('/management', require('./management'))
router.use('/flight',require('./flight'))
router.use('/schedule',require('./schedule'))
router.use('/route',require('./route'))
router.use('/seat',require('./seat'))
router.use('/aircraft',require('./aircraft'))
router.use('/bookings', require('./bookings'))
router.use('/ticket', require('./ticket'))
router.use('/reports', require('./reports/index'))
router.use('/flight-booking-detail', require('./flightBookingDetail'))

module.exports = router
