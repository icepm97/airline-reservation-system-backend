const pool = require('./db')

const getSeats = async (aircraft_model) => {
    let { rows } = await pool.query("select * from seat natural join isbooked(seat.seat_id,1,'2019-12-29') as booked where aircraft_model = $1", [aircraft_model])
    return rows;
}
module.exports = {getSeats}
    