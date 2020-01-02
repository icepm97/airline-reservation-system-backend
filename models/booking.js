const pool = require('./db')


const getBookingTickets = async (customer_id, booking_id) => {
    let { rows } = await pool.query('SELECT ticket_id, first_name, last_name, seat_row, seat_column, seat_class, ticket_price FROM ticket_overview WHERE (customer_id, booking_id) = ($1, $2)', [customer_id, booking_id])
    return rows
}


const getCustomerBookings = async (customer_id) => {
    let { rows } = await pool.query('SELECT * FROM get_customer_bookings($1)', [customer_id])
    return rows
}


const create = async (customer_id, schedule_id, tickets) => {
    const client = await pool.connect()

    try {
        await client.query('BEGIN')
        const booking_ids = (await client.query('INSERT INTO "booking" ("booked_date", "customer_id", "shedule_id") VALUES (current_date, $1, $2) RETURNING "booking_id"', [customer_id, schedule_id])).rows
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


const createForGuest = async (guest, schedule_id, tickets) => {
    const client = await pool.connect()

    try {
        await client.query('BEGIN')
        const customer_ids = (await client.query('INSERT INTO "customer" ("email", "first_name", "last_name", "gender", "birthday", "NIC", "country") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "customer_id"', 
            [guest.email, guest.first_name, guest.last_name, 'male', '2000-01-01', guest.nic, guest.country])).rows
        const booking_ids = (await client.query('INSERT INTO "booking" ("booked_date", "customer_id", "schedule_id") VALUES (current_date, $1, $2) RETURNING "booking_id"', [customer_ids[0].customer_id, schedule_id])).rows
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


module.exports = { getBookingTickets, getCustomerBookings, create, createForGuest }