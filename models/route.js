const pool = require("./db");

const getAllRoutes = async flight => {
  let { rows } = await pool.query("SELECT * FROM public.route");
  return rows;
};

module.exports = { getAllRoutes };
