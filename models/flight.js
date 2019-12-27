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
    if(result.rowCount>=1){
        return true
    }
    return false;
}

const scheduleFlights = async ()=>{
    let result = await pool.query("insert into schedule(date,departure_time_delay,arrival_time_delay,flight_id,state) select '1999-12-21','00:00','00:00',flight.flight_id,'on_time' from flight;")
}
module.exports = {addFlight,getFlights,deleteFlight}