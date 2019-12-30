const pool = require('./db')


const getticketids = async (booking_id, result) => {
    let { rows } = await pool.query('SELECT "ticket_id" from "ticket" JOIN "booking" USING ("booking_id") WHERE "booking_id" = $1', [booking_id])
    if ((rows.length > 0)) {
        return rows
    }
    return null
}


const tickethistory = async (customer_id, result) => {
    let { rows } = await pool.query('SELECT "booking_id", "booked_date", count("ticket_id"), sum("price") FROM "booking" JOIN "ticket" USING ("booking_id") GROUP BY "booking_id" WHERE "customer_id" = $1', [customer_id])
    if ((rows.length >= 0)) {
        return rows
    }
    return null
}


const create = async (customer_id, date, flight_id, tickets) => {
    const client = await pool.connect()
    // if ((!customer_id) && (!customer)) {
    //     return //////////////////////////////////////////
    // }

    try {
        await client.query('BEGIN')
        // if (!customer_id) {
        //     { rows } = await client.query('INSERT INTO "booking" ("booked", "first_name", "last_name", "gender", "birthday", "NIC", "country", "category") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "customer_id"', [customer.email, customer.first_name, customer.last_name, 'male', '2000-00-00', '000000000', customer.country, 'guest'])
        // }
        const booking_ids = (await client.query('INSERT INTO "booking" ("booked_date", "customer_id") VALUES (current_date, $1) RETURNING "booking_id"', [customer_id])).rows
        for (const ticket of tickets) {
            const passenger = ticket.passenger
            const passenger_ids = (await client.query('INSERT into "passenger" ("first_name", "last_name", "gender", "birthday", "passport_no", "email", "country") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING passenger_id',
                [passenger.first_name, passenger.last_name, passenger.gender, passenger.birthday, passenger.passport_no, passenger.email, passenger.country])).rows
            await client.query('INSERT into "ticket" ("passenger_id", "seat_id", "flight_id", "date", "booking_id", "price") VALUES ($1, $2, $3, $4, $5, $6)', 
                [passenger_ids[0].passenger_id, ticket.seat_id, flight_id, date, booking_ids[0].booking_id, 0])
        } 
        await client.query('COMMIT')
        return booking_ids[0].booking_id
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }

}


module.exports = { getticketids, tickethistory, create }