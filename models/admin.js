const connection = require('./db')


const login = (username, password, result) => {
    connection.query('SELECT `management_id`, `username`, `password` FROM `management_login` JOIN `management` USING (`username`) WHERE usename=? LIMIT 1', username, (err, res) => {
        let data = ((!err) && (res.length == 1) && (res[0].password == password)) ? {id: res[0].customer_id} : null
        result(err, data)
    })
}


module.exports = {login}