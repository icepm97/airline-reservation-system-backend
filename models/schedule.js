const pool = require("./db");

const getScheduleToday = async () => {
  let { rows } = await pool.query(
    "select * from schedule natural join flight natural join route natural join aircraft natural join aircraft_model where active_status = true and date >= current_date order by schedule_id "
  );
  return rows;
};

const changeState = async (data) => {
  if(data.state!=="delay"){
    data.departure_time_delay="00:00"
    data.duration_delay="00:00"
  }
  let {
    rowCount
  } = await pool.query(
    "update schedule set state = $1,departure_time_delay = $2,duration_delay=$3 where schedule_id = $4 and schedule.date = current_date",
    [data.state,data.departure_time_delay,data.duration_delay, data.schedule_id]
  );
  if (rowCount > 0) {
    return true;
  } else {
    return false;
  }
};

const getHistory = async route_id => {
  let { rows } = await pool.query("select * from schedule natural join flight natural join aircraft natural join aircraft_model natural join passengercountbyschedule(flight_id,date) as passenger_count where date<current_date and route_id = $1  order by date desc",[route_id]);
  return rows
};

module.exports = { getScheduleToday,changeState,getHistory };
