const pool = require("./db");

const getAllRoutes = async () => {
  let { rows } = await pool.query("select route.route_id, route.origin_id, origin.name as origin_name, origin.country as origin_country,route.destination_id,dest.name as dest_name ,dest.country as dest_country from route inner join get_airport(route.origin_id) as origin on origin.short_code = route.origin_id inner join get_airport(route.destination_id) as dest on dest.short_code = route.destination_id;");
  return rows;
};

module.exports = { getAllRoutes };
