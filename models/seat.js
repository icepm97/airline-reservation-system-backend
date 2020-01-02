const pool = require('./db')

const getSeats = async (customer_id, schedule_id) => {
    let { rows } = await pool.query('select seat_id, seat.row, seat.column, name as class_name, isbooked(seat.seat_id, schedule.schedule_id) as booked, price, discounted_price  from schedule join flight using (flight_id) join aircraft using (aircraft_id) join seat on (aircraft.model_id = seat.aircraft_model) join "class" using (class_id) natural join get_price($1, seat.seat_id, schedule.schedule_id) where schedule.schedule_id = $2', [customer_id, schedule_id])
    return rows; // join isbooked(seat.seat_id, schedule.schedule_id) join get_price($1, seat.seat_id, schedule.schedule_id)
}
module.exports = {getSeats}
    