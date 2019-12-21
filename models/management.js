const connection = require('./db')


const login = async (username, password) => {
    let { rows } = await connection.query('SELECT "management_id", "username", "password", "firs_name", last_name" FROM "management_login" JOIN "management" USING ("management_id") WHERE "username" = $1 LIMIT 1', [username])
    if ((rows.length == 1) && (rows[0].password == password)) {
        let {password, ...data} = rows[0]
        return data
    }
    return null
}


module.exports = { login }