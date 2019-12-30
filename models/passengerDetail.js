const connection = require('./db')

const getPassenger = async (flight_id, date) => {
    let { rows } = await connection.query('SELECT passenger.passenger_id, passenger.first_name, passenger.last_name, class.class_id, class.name as class_name, seat.seat_id, seat.aircraft_model, seat.row, seat.column, checkage(booking.date, passenger.birthday) as age FROM ticket NATURAL JOIN passenger NATURAL JOIN seat NATURAL JOIN class natural join booking WHERE booking.flight_id=$1 AND booking.date=$2', [flight_id, date])
    if(rows.length!=0){
        
        return rows;
    }
    else{
        return null
    }
    
}

module.exports = {getPassenger}