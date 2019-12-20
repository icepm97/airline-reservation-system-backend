const connection = require('./db')


const login = async (username, password) => {
    let { rows } = await connection.query('SELECT "management_id", "username", "password" FROM "management_login" JOIN "management" USING ("management_id") WHERE "username" = $1 LIMIT 1', [username])
    let data = ((rows.length == 1) && (rows[0].password == password)) ? {id: rows[0].management_id} : null
    return data
}


module.exports = {login}