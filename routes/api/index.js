const router = require('express').Router()

router.use('/customers', require('./customers'))
router.use('/management', require('./management'))
router.use('/flight',require('./flight'))
router.use('/route',require('./route'))
router.use('/aircraft',require('./aircraft'))
module.exports = router
