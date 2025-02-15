const pool = require('./db')
const validator = require('email-validator')
const bcrypt = require('bcryptjs')


const login = async (email, password, result) => {
    let { rows } = await pool.query('SELECT "customer_id", "email", "first_name", "last_name", "gender", "birthday", "NIC", "category", "password" FROM "customer_login" JOIN "customer" USING ("customer_id") WHERE "email" = $1 LIMIT 1', [email])
    if ((rows.length == 1) && (await bcrypt.compare(password, rows[0].password))) {
        let { password, ...data } = rows[0]
        return data
    }
    return null
}


const register = async (email, first_name, last_name, gender, birthday, NIC, country, password) => {
    const client = await pool.connect()
    const { rows } = await client.query('SELECT count("email") AS "emails",count("NIC") AS "nics"  FROM "customer" WHERE "email" = $1 or "NIC" = $2', [email,NIC])

    console.log(rows)
    if ((rows[0].emails != 0) || (rows[0].nics != 0)) {
        return null
    }

    try {
        password = await bcrypt.hash(password, 8)
        await client.query('BEGIN')
        const { rows } = await client.query('INSERT INTO "customer" ("email", "first_name", "last_name", "gender", "birthday", "NIC", "country") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "customer_id"', [email, first_name, last_name, gender, birthday, NIC, country])
        await client.query('INSERT into "customer_login" ("customer_id", "password") VALUES ($1, $2)', [rows[0].customer_id, password])
        await client.query('COMMIT')
        return rows[0].customer_id
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }

}



module.exports = { login, register }