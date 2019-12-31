const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('revenue')
})

module.exports = router
