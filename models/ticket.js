const connection = require('./db')

const getTicketDetail = async (ticket_id) => {
        let { rows } = await connection.query('SELECT "class".name AS "class", ticket.passenger_id, ticket.seat_id,seat.row,seat.column, ticket.booking_id , customer.first_name AS bookedBy, passenger.first_name, passenger.last_name, passenger.passport_no, age(current_date, passenger.birthday) as age, passenger.country AS passenger_country, seat.aircraft_model, flight.journey_duration, flight.departure_time, flight_id, schedule.state, aircraft_model.model, aircraft_model.brand, booking.date, ticket.price AS price, route_id, A.short_code AS origin_shortCode, A.country AS origin_country, A.name AS origin_name, get_airport_location(A.short_code) as origin_location, B.short_code AS destination_shortCode, B.country AS destination_country, B.name AS destination_name, get_airport_location(B.short_code) as destination_location  FROM ticket NATURAL JOIN booking natural join passenger NATURAL JOIN seat NATURAL JOIN "class" JOIN schedule on schedule.schedule_id=booking.shedule_id NATURAL JOIN flight NATURAL JOIN aircraft NATURAL JOIN aircraft_model NATURAL JOIN route JOIN customer ON customer.customer_id = booking.customer_id, airport A, airport B WHERE ticket.ticket_id = $1 and A.short_code=route.origin_id AND B.short_code = route.destination_id', [ticket_id])
        if(rows.length==1){
            let data = {row:rows[0].row,column:rows[0].column,class: rows[0].class ,passenger_id: rows[0].passenger_id, seat: rows[0].seat_id, booking_id: rows[0].booking_id, bookedBy: rows[0].bookedBy, price: rows[0].price, passenger:{first_name: rows[0].first_name, last_name: rows[0].last_name, passport_id: rows[0].passport_no, age: rows[0].age, country: rows[0].passenger_country}, flight:{model: rows[0].model, brand: rows[0].brand,time:{departure: rows[0].departure_time, duration: rows[0].journey_duration}, flight_id: rows[0].flight_id, date: rows[0].date, status: rows[0].state, Route: {origin: {shortCode: rows[0].origin_shortcode, name: rows[0].origin_name, location:rows[0].origin_location, country: rows[0].origin_country}, destination: {shortCode: rows[0].destination_shortcode, name: rows[0].destination_name, location:[rows[0].destination_location], country: rows[0].destination_country}}}} 
            return data
        }
     
    else{
        return null
    }
}
module.exports = {getTicketDetail}
