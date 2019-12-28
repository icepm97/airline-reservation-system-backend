const pool = require('./db')

const getSeats = async (aircraft_model,date) => {
    let { rows } = await pool.query("select * from seat inner join flight on seat.aircraft_model=flight.aircraft_model natural join isbooked(seat.seat_id,flight_id,$1)  as booked where flight_id = $2", [date,aircraft_model])
    return rows;
}
module.exports = {getSeats}
    