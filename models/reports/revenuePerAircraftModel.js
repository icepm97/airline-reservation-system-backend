const pool = require("./db");


const getRevenuePerAircraftModel = async () => {
    let { rows } = await pool.query("select * from aircraft_model_revenue;");
    return rows;
}


module.exports = {getRevenuePerAircraftModel}