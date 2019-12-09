var connection = require('../../models/db')

const authorize = (email, password) => {
    connection.query('SELECT `customer_id`, `email`, `password` FROM `customer_login` JOIN `customer` USING (`email`) WHERE email=? LIMIT 1', email, (error, result) => {
        if ((resulr.length !== 0) && (result[0].password == password)) {
            return result[0].customer_id
        } else {
            return false
        }
    })
}