const connection = require('./db')

const getTicketDetail = async (ticket_id) => {
    let { rows } = await connection.query('SELECT checkTicket(?) AS `getCount`', [ticket_id])
    if((rows.length == 1) && (rows[0].getCount==1)){
        let { rows } = await connection.query('SELECT * FROM ticket WHERE ticket_id=?', [ticket_id])
        if(rows.length==1){
            let data = {passenger_id: rows[0].passenger_id, seat_code: rows[0].seat_code, flight_id: rows[0].flight_id, date: rows[0].date, booking_id: rows[0].booking_id} 
            return data
        }
    } 
    else{
        return null
    }

module.exports = {getTicketDetail}
    
    // if((!err) && (res[0].getCount == 1)){
    //         connection.query('SELECT * FROM ticket WHERE ticket_id=?', ticket_id, function(err, res){
    //             if(err){
    //                 result(err, null)
    //             }
    //             else{
    //                 let data = {passenger_id: res[0].passenger_id, seat_code: res[0].seat_code, flight_id: res[0].flight_id, date: res[0].date, booking_id: res[0].booking_id}
    //                 result(null, data)
    //             }
    //             })
    //     }
    //     else{
    //         if(err){
    //             result(err, null)
    //         }
    //         else{
    //             result(null, null)
    //         }
    //     }
    
    
}