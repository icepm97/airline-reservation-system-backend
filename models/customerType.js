const connection = require('./db')

const getcustomerType = async (start_date, end_date) => {
    let { rows } = await connection.query('select distinct category, numberofbooking from getpassengertype where booked_date between $1 and $2', [start_date, end_date])
    if(rows.length!=0){
        
        return rows;
    }
    else{
        return null
    }
    
}

module.exports = {getcustomerType}