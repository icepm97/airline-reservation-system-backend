const pool = require("./db");

const addFlight = async flight => {
  let {
    rows
  } = await pool.query(
    "INSERT INTO public.flight (journey_duration,departure_time,route_id,aircraft_model) VALUES ($1,$2,$3,$4)",
    [
      flight.journey_duration,
      flight.departure_time,
      flight.route_id,
      flight.aircraft_model
    ]
  );
  return true;
};

const getFlights = async () => {
  let { rows } = await pool.query(
    "select * from flight natural join route natural join aircraft_model where flight.aircraft_model = aircraft_model.model_id and active_status = true"
  );
  return rows;
};

const deleteFlight = async flight_id => {
  let result = await pool.query(
    "update flight set active_status = false where flight_id = $1",
    [flight_id]
  );
  if (result.rowCount >= 1) {
    return true;
  }
  return false;
};

const scheduleFlights = async () => {
  let result = await pool.query(
    "insert into schedule(date,departure_time_delay,duration_delay,flight_id,state) select current_date,'00:00','00:00',flight.flight_id,'on_time' from flight ON CONFLICT (flight_id,date) DO NOTHING;"
  );
  if (result.rowCount > 0) {
    return true;
  } else {
    return false;
  }
};


module.exports = { addFlight, getFlights, deleteFlight, scheduleFlights};
