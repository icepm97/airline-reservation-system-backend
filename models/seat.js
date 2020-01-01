const pool = require('./db')

const getSeats = async (aircraft_model,date) => {
    let { rows } = await pool.query("select booked,class_id,seat.column,seat.row,seat_id,name as class_name from class join seat using(class_id) natural join isbooked(seat.seat_id,flight_id,$1) as booked where flight_id = $2 order by row ,seat.column ", [date,aircraft_model])
    return rows;
}
module.exports = {getSeats}
    