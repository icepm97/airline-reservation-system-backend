const pool = require('./db')
const validator = require('email-validator')
const schema = require('password-validator')
const shortid = require('shortid')
const bcrypt = require('bcrypt')


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
    const { rows } = await client.query('SELECT count("email") AS "emails",count("NIC") AS "nic"  FROM "customer" WHERE "email" = $1 or "NIC" = $2', [email,NIC])

    console.log(rows)
    if (rows[0].count != 0) {
        return null
    }

    try {
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

function validations(email, password) {
    var schema = new schema();
    // Add properties to it
    schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits()                                 // Must have digits
        .has().not().spaces()                           // Should not have spaces
    //.is().not().oneOf(['Password123']);             // Blacklist these values

    let mail = (validator.validate(email) ? true : console.log("email format is wrong"))
    let pass = (schema.validate(password) ? true : console.log("password must have length 8<= pass<= 100, atleast an upperletter, a lowerletter, a digit and should not have 'space'"))

    if (mail && pass) {
        return true;
    }
    return false;
}


module.exports = { login, register }