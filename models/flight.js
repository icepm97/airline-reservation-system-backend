const pool = require("./db");

const addFlight = async flight => {
  let {
    rows
  } = await pool.query(
    "INSERT INTO public.flight (journey_duration,departure_time,route_id,aircraft_id) VALUES ($1,$2,$3,$4)",
    [
      flight.journey_duration,
      flight.departure_time,
      flight.route_id,
      flight.aircraft_id
    ]
  );
  return true;
};

const getFlights = async () => {
  let { rows } = await pool.query(
    "select * from flight natural join route natural join aircraft natural join aircraft_model where  active_status = true"
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

const scheduleFlights = async (start_date, end_date) => {
  const _start_date = new Date(start_date + 'Z')
  const _end_date = new Date(end_date + 'Z')
  let result_row_count = 0
  for (let d = new Date(_start_date); d <= _end_date; d.setDate(d.getDate() + 1)) {
    let result = await pool.query(
      "insert into schedule(date, departure_time_delay, duration_delay, flight_id, state) (select $1, '00:00', '00:00', flight.flight_id, 'on_time' from flight WHERE active_status = true) ON CONFLICT (flight_id,date) DO NOTHING;",
      [d.toISOString()]
    );
    console.log(d)
    console.log(result_row_count)
    result_row_count += result.rowCount
  }
  if (result_row_count > 0) {
    return true;
  } else {
    return false;
  }
};


module.exports = { addFlight, getFlights, deleteFlight, scheduleFlights};
