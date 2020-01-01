const router = require('express').Router()

router.get('/', (req, res) => {
  res.send(new Date())
})

router.use('/api', require('./api/index'))

module.exports = router
