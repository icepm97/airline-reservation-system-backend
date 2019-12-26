const pool = require("./db");

const getAircraftModels = async () => {
  let { rows } = await pool.query("select * from aircraft_model;");
  return rows;
};

module.exports = { getAircraftModels };
