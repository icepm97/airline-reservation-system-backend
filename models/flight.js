const pool = require("./db");

const addFlight = async flight => {
  let {
    rows
  } = await pool.query(
    'SELECT "customer_id", "email", "first_name", "last_name", "gender", "birthday", "NIC", "category", "password" FROM "customer_login" JOIN "customer" USING ("customer_id") WHERE "email" = $1 LIMIT 1',
    [email]
  );
  if (rows.length == 1 && (await bcrypt.compare(password, rows[0].password))) {
    let { password, ...data } = rows[0];
    return data;
  }
  return null;
};
