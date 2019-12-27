const pool = require('./db')

const getticketids = async(booking_id, result) => {
    let { rows } = await pool.query('SELECT "ticket_id" from "ticket" JOIN "booking" USING ("booking_id") WHERE "booking_id" = $1',[booking_id])
    if ((rows.length > 0)){
        return rows
    }
    return null
}

const tickethistory = async(passenger_id, result) => {
    let { rows } = await pool.query('SELECT "ticket_id" from "ticket" JOIN "passenger" USING ("passenger_id") WHERE "passenger_id" = $1',[passenger_id])
    if ((rows.length >= 0)){
        return rows
    }
    return null
}

module.exports = { getticketids, tickethistory }