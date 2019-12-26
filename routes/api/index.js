const router = require('express').Router()

router.use('/customers', require('./customers'))
router.use('/management', require('./management'))
router.use('/flight',require('./flight'))
router.use('/route',require('./route'))
module.exports = router
