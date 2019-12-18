const mysql = require("mysql")
const config = require("../config/config")

const connection = mysql.createPool(config.mysql)

module.exports = connection;