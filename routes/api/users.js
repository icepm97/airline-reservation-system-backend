var router = require('express').Router()

router.get('/', (req, res) => {
  res.send('users api endpoint')
})

module.exports = router
