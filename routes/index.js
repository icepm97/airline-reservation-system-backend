const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('hello')
})

router.use('/api', require('./api/index'))

module.exports = router
