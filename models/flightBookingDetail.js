const connection = require('./db')

const getBookingDetails = async (flight_id, date) => {
    let { rows } = await connection.query('SELECT booking_id, customer.first_name, customer.last_name, seat.seat_id, bookingCount(booking_id), seat.aircraft_model, seat.row, seat.column, flight_id FROM schedule join booking on schedule.schedule_id=booking.shedule_id NATURAL JOIN ticket NATURAL JOIN seat natural join customer WHERE schedule.flight_id=$1 AND schedule.date=$2', [flight_id, date])
    if(rows.length!=0){
        
        return rows;
    }
    else{
        return null
    }
    
}

module.exports = {getBookingDetails}