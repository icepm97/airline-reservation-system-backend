const router = require('express').Router()
const pool = require("../models/db");

router.get('/', (req, res) => {
  pool.query("select now()", [], (err, result) => {

    res.send(result.rows)
  })
})

router.use('/api', require('./api/index'))

module.exports = router
