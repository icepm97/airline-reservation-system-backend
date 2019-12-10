const router = require('express').Router()

router.use('/customers', require('./customers'))
router.use('/admin', require('./admin'))

module.exports = router
