const pool = require('./db')

const getSeats = async (aircraft_model) => {
    let { rows } = await pool.query('select * from seat where aircraft_model = $1', [aircraft_model])
    return rows;
}
module.exports = {getSeats}
    