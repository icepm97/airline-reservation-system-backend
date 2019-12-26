const pool = require("./db");

const addFlight = async flight => {
  let {
    rows
  } = await pool.query(
  "INSERT INTO public.flight (journey_duration,departure_time,route_id,aircraft_model) VALUES ($1,$2,$3,$4)",
    [flight.journey_duration,flight.departure_time,flight.route_id,flight.aircraft_model]
  );
  return true;
};

module.exports = {addFlight}