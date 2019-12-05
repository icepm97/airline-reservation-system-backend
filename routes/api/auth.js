var router = require('express').Router()

router.post('/', (req, res) => {
  if (req.body.username == 'pathum' && req.body.password == '123') {
      res.json({
          message: 'success',
          data: ''
      })
  } else {
    res.json({
        error: 'unauthorized',
        message: 'Authentication failed'
    })
  }
})

module.exports = router

