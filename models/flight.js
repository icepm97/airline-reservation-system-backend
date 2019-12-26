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

const getFlights = async ()=>{
    let{rows} = await pool.query("select * from flight natural join route natural join aircraft_model where flight.aircraft_model = aircraft_model.model_id")
    return rows;
}

const deleteFlight = async (flight_id)=>{
    let result = await pool.query("delete from flight where flight_id = $1",[flight_id])
    console.log(result)
    return true;
}
module.exports = {addFlight,getFlights,deleteFlight}