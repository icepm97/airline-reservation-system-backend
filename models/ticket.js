const connection = require('./db')

const getTicketDetail = async (ticket_id) => {
        let { rows } = await connection.query('SELECT "class".name AS "class", ticket.passenger_id, ticket.seat_id, ticket.booking_id , customer.first_name AS bookedBy, passenger.first_name AS passenger_name, passenger.passport_no, passenger.birthday, passenger.country AS passenger_country, seat.aircraft_model, flight.journey_duration, flight.departure_time, flight_id, flight.active_status, booking.date, price.amount AS price, route_id, A.short_code AS origin_shortCode, A.country AS origin_country, A.name AS origin_name, C.name AS origin_location, B.short_code AS destination_shortCode, B.country AS destination_country, B.name AS destination_name, D.name AS destination_location  FROM ticket NATURAL JOIN passenger NATURAL JOIN seat NATURAL JOIN "class" NATURAL JOIN flight NATURAL JOIN route NATURAL JOIN price NATURAL JOIN booking JOIN customer ON customer.customer_id = booking.customer_id, airport A, airport B, location C, location D WHERE ticket.ticket_id = $1 and A.short_code=route.origin_id AND B.short_code = route.destination_id AND C.location_id=A.location_id AND D.location_id=B.location_id', [ticket_id])
        if(rows.length==1){
            let data = {class: rows[0].class ,passenger_id: rows[0].passenger_id, seat: rows[0].seat_id, booking_id: rows[0].booking_id, bookedBy: rows[0].bookedBy, price: rows[0].price, passenger:{name: rows[0].passenger_name, passport_id: rows[0].passport_no, birthday: rows[0].birthday, country: rows[0].passenger_country}, flight:{model: rows[0].aircraft_model, time:{depature: rows[0].depature_time, duration: rows[0].journey_duration}, flight_id: rows[0].flight_id, date: rows[0].date, status: rows[0].active_status, Route: {route_id: rows[0].route_id, origin: {shortCode: rows[0].origin_shortCode, name: rows[0].origin_name, location:[rows[0].origin_location], country: rows[0].origin_country}, destination: {shortCode: rows[0].destination_shortCode, name: rows[0].destination_name, location:[rows[0].destination_location], country: rows[0].destination_country}}}} 
            return data
        }
     
    else{
        return null
    }
}
module.exports = {getTicketDetail}
