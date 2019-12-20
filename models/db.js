const { Pool } = require('pg')
const pgConfig = require("../config/config").pg

const pool = new Pool(pgConfig)

module.exports = pool 