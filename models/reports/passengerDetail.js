const connection = require('../db')

<<<<<<< HEAD
const getPassenger = async (flight_id, date) => {
    let { rows } = await connection.query('SELECT * FROM givenrangepassengers WHERE flight_id=$1 AND date=$2', [flight_id, date])
=======
const getPassenger = async (flight_id) => {
    let { rows } = await connection.query('SELECT  first_name, last_name, seat_class, seat_row, seat_column, checkage(birthday, date) AS age FROM givenrangepassengers WHERE flight_id=$1 and (date>current_date or (date=current_date and departure_time::time> now()::time)) order by departure_time limit 1', [flight_id])

>>>>>>> 59a3ac255727d33edc513b887e5a1c34cd269173
    return rows;   
}


const getRequestedPassengers = async (destination, start_date, end_date) => {
    console.log(destination, start_date, end_date)
    let { rows } = await connection.query('SELECT * FROM givenrangepassengers WHERE destination_id = $1 AND $2 <= date  AND date <= $3 ', [destination, start_date, end_date])
    return rows;
}

module.exports = {getPassenger, getRequestedPassengers}