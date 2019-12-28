const pool = require('./db')

const getSeats = async (aircraft_model,date) => {
    let { rows } = await pool.query("select * from seat natural join isbooked(seat.seat_id,1,$1) as booked where aircraft_model = $2", [aircraft_model,date])
    return rows;
}
module.exports = {getSeats}
    