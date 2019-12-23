const pool = require('./db')
const bcrypt = require('bcrypt')

const login = async (username, password) => {
    let { rows } = await pool.query('SELECT "management_id", "username", "first_name", "last_name", "NIC", "email", "password" FROM "management_login" JOIN "management" USING ("management_id") WHERE "username" = $1 LIMIT 1', [username])
    if ((rows.length == 1) && (await bcrypt.compare(password, rows[0].password))) {
        let {password, ...data} = rows[0]
        return data
    }
    return null
}

module.exports = { login }