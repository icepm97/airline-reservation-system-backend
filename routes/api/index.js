const router = require('express').Router()

router.use('/customers', require('./customers'))
router.use('/management', require('./management'))

module.exports = router
