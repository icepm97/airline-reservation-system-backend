const pool = require("./db");

const getAircraftModels = async () => {
  let { rows } = await pool.query("select * from aircraft_model;");
  return rows;
};

const getAircrafts = async () => {
  let { rows } = await pool.query("select * from aircraft;");
  return rows;
};

module.exports = { getAircraftModels, getAircrafts };
