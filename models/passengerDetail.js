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


const getRequestedPassengers = async (destination, start_date, end_date) => {
    let { rows } = await Connection.query('SELECT ticket.flight_id, ticket.date FROM ticket NATURAL JOIN flight NATURAL JOIN route WHERE route.destination_id == $1 AND $2 <= ticket.date <= $3', [destination, start_date, end_date])
    if(rows.length!=0){
        let data = []
        for (var indx in rows){
            data.push( getPassenger(indx[0], indx[1]));
        }
        return data
    }
    else{
        return null
    }
}

module.exports = {getPassenger, getRequestedPassengers}