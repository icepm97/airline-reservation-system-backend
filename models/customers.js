const connection = require('./db')


const login = (email, password, result) => {
    connection.query('SELECT `customer_id`, `email`, `password` FROM `customer_login` JOIN `customer` USING (`email`) WHERE email=? LIMIT 1', email, (err, res) => {
        let data = ((!err) && (res.length == 1) && (res[0].password == password)) ? {id: res[0].customer_id} : null
        result(err, data)
    })
}


const register = (email, password, result) => {
    connection.query('SELECT `customer_id`, `email`, `password` FROM `customer_login` JOIN `customer` USING (`email`) WHERE email=? LIMIT 1', email, (err, res) => {
        let data = ((!err) && (res.length == 1) && (res[0].password == password)) ? {id: res[0].customer_id} : null
        result(err, data)
    })
}


module.exports = {login, register}