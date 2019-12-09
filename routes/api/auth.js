var router = require('express').Router()


/*
Auth
username, password, type{management, customer}
jwt
*/
router.post('/', (req, res) => {
  if (req.body.username == 'pathum' && req.body.password == '123') {
      res.json({
          message: 'success',
          data: ''
      })
  } else {
    res.json({
        error: 'unauthorized'
    })
  }
})

module.exports = router

