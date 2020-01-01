const connection = require('../db')

const getPassenger = async (flight_id, date) => {
    let { rows } = await connection.query('SELECT  first_name, last_name, seat_class, seat_row, seat_column, checkage(birthday, $2) AS age FROM givenrangepassengers WHERE flight_id=1 AND date= $2', [flight_id, date])
    return rows;   
}


const getRequestedPassengers = async (destination, start_date, end_date) => {
    console.log(destination, start_date, end_date)
    let { rows } = await connection.query('SELECT * FROM givenrangepassengers WHERE destination_id = $1 AND $2 <= date  AND date <= $3 ', [destination, start_date, end_date])
    return rows;
}

module.exports = {getPassenger, getRequestedPassengers}