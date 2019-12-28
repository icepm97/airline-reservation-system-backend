const connection = require('./db')

const getTicketDetail = async (ticket_id) => {
    let { rows } = await connection.query('SELECT checkTicket($1) AS `getCount`', [ticket_id])
    if((rows.length == 1) && (rows[0].getCount==1)){
        let { rows } = await connection.query('SELECT class.name AS class, ticket.passenger_id, ticket.seat_id, ticket.booking_id, customer.first_name AS bookedBy, price.amount , passenger.first_name AS passenger_name, passenger.passport_no, passenger.birthday, seat.aircraft_model, flight.arrival_time, flight.departure_time, ticket.flight_id, ticket.date, flight.active_status, A.short_code AS origin_shortCode, A.country AS origin_country, A.name AS origin_name, C.name AS origin_location, B.short_code AS destination_shortCode, B.country AS destination_country, B.name AS destination_name, D.name AS destination_location FROM ticket NATURAL JOIN passenger NATURAL JOIN seat NATURAL JOIN class NATURAL JOIN flight NATURAL JOIN price NATURAL JOIN booking JOIN customer NATURAL JOIN route , airport A INNER JOIN airport B, location C INNER JOIN location D WHERE ticket.ticket_id = $1 and customer.customer_id=booking.customer_id and A.short_code=route.origin_id AND B.short_code = route.destination_id AND C.location_id=A.location_id AND D.location_id=B.location_id', [ticket_id])
        if(rows.length==1){
            let data = {class: rows[0].class ,passenger_id: rows[0].passenger_id, seat: rows[0].seat_id, booking_id: rows[0].booking_id, bookedBy: rows[0].bookedBy, price: rows[0].amount, passenger:{name: rows[0].passenger_name, passport_id: rows[0].passport_no, birthday: rows[0].birthday}, flight:{model: rows[0].aircraft_model, time:{depature: rows[0].depature_time, arrival: rows[0].arrival_time}, flight_id: rows[0].flight_id, date: rows[0].date, status: rows[0].active_status, Route: {origin: {shortCode: rows[0].origin_shortCode, name: rows[0].origin_name, location:[rows[0].origin_location], country: rows[0].origin_country}, destination: {shortCode: rows[0].destination_shortCode, name: rows[0].destination_name, location:[rows[0].destination_location], country: rows[0].destination_country}}}} 
            return data
        }
    } 
    else{
        return null
    }
}
module.exports = {getTicketDetail}
