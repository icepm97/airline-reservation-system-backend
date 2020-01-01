const connection = require('../db')

const getcustomerType = async (start_date, end_date) => {
    let { rows } = await connection.query('select category, sum(booking_count) from no_of_bookings where date between $1 and $2 group by category', [start_date, end_date])
    return rows;  
}

module.exports = {getcustomerType}