const pool = require('./db')


const getBookingTickets = async (customer_id, booking_id) => {
    let { rows } = await pool.query('SELECT ticket_id, first_name, last_name, seat_row, seat_column, seat_class, ticket_price FROM ticket_overview WHERE (customer_id, booking_id) = ($1, $2)', [customer_id, booking_id])
    return rows
}


const getCustomerBookings = async (customer_id) => {
    let { rows } = await pool.query('SELECT * FROM get_customer_bookings($1)', [customer_id])
    return rows
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
        const booking_ids = (await client.query('INSERT INTO "booking" ("booked_date", "customer_id", "flight_id", "date") VALUES (current_date, $1, $2, $3) RETURNING "booking_id"', [customer_id, flight_id, date])).rows
        for (const ticket of tickets) {
            const passenger = ticket.passenger

            const passenger_ids = (await client.query('INSERT into "passenger" ("first_name", "last_name", "gender", "birthday", "passport_no", "email", "country") VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT ("passport_no") DO UPDATE SET ("first_name", "last_name", "gender", "birthday", "email", "country") = (excluded."first_name", excluded."last_name", excluded."gender", excluded."birthday", excluded."email", excluded."country") RETURNING passenger_id',
                [passenger.first_name, passenger.last_name, passenger.gender, passenger.birthday, passenger.passport_no, passenger.email, passenger.country])).rows
            console.log(passenger_ids)
            await client.query('INSERT into "ticket" ("passenger_id", "seat_id", "booking_id", "price") VALUES ($1, $2, $3, $4)',
                [passenger_ids[0].passenger_id, ticket.seat_id, booking_ids[0].booking_id, 0])
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


module.exports = { getBookingTickets, getCustomerBookings, create }