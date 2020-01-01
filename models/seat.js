const pool = require('./db')

const getSeats = async (schedule_id) => {
    let { rows } = await pool.query('select seat_id, seat.row, seat.column, name as class_name, isbooked(seat.seat_id, schedule.schedule_id) as booked from schedule join flight using (flight_id) join aircraft using (aircraft_id) join seat on (aircraft.model_id = seat.aircraft_model) join "class" using (class_id) where schedule.schedule_id = $1', [schedule_id])
    return rows;
}
module.exports = {getSeats}
    