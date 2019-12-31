const connection = require('./db')

const getcustomerType = async (start_date, end_date) => {
    let { rows } = await connection.query('SELECT DISTINCT customer.category AS customerType, numberOfBooking(customer.category, $1, $2) FROM booking NATURAL JOIN customer WHERE booking.date BETWEEN $1 AND $2', [start_date, end_date])
    if(rows.length!=0){
        
        return rows;
    }
    else{
        return null
    }
    
}

module.exports = {getcustomerType}