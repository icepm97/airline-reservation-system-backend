const pool = require('./db')


const getticketids = async (booking_id, result) => {
    let { rows } = await pool.query('SELECT "ticket_id" from "ticket" JOIN "booking" USING ("booking_id") WHERE "booking_id" = $1', [booking_id])
    if ((rows.length > 0)) {
        return rows
    }
    return null
}


const tickethistory = async (customer_id, result) => {
    let { rows } = await pool.query('SELECT "booking_id", "booked_date", count("tiket_id"), sum("price") FROM "booking" JOIN "ticket" USING ("booking_id") GROUP BY "booking_id" WHERE "customer_id" = $1', [customer_id])
    if ((rows.length >= 0)) {
        return rows
    }
    return null
}


const create = async (customer_id, date, flight_id, tickets, customer) => {
    const client = await pool.connect()
    if ((!customer_id) && (!customer)) {
        return //////////////////////////////////////////
    }

    try {
        await client.query('BEGIN')
        if (!customer_id) {
            { rows } = await client.query('INSERT INTO "booking" ("booked", "first_name", "last_name", "gender", "birthday", "NIC", "country", "category") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "customer_id"', [customer.email, customer.first_name, customer.last_name, 'male', '2000-00-00', '000000000', customer.country,'guest'])
        }
        const { rows } = await client.query('INSERT INTO "booking" ("booked", "first_name", "last_name", "gender", "birthday", "NIC", "category") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "customer_id"', [email, first_name, last_name, gender, birthday, NIC, category])
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



module.exports = { getticketids, tickethistory }