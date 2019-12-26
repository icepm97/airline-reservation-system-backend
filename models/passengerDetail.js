const connection = require('./db')

const getPassenger = async (flight_id, date) => {
    let { rows } = await connection.query('SELECT passenger.passenger_id, passenger.first_name, passenger.last_name, class.class_id, class.name, seat.seat_id, seat.aircraft_model, seat.row, seat.column FROM ticket NATURAL JOIN passenger NATURAL JOIN seat NATURAL JOIN class WHERE ticket.flight_id= $1 AND ticket.date= $2', [flight_id, date])
    if(rows.length!=0){
        let data = rows
        return data
    }
    else{
        return null
    }
    
}

module.exports = {getPassenger}