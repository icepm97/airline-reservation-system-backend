const router = require("express").Router();
const schedule = require("../../models/schedule");
const response = require("../../helper/response");
const middlewareJWT = require("../../helper/jwt_middleware");
const types = require("../../config/types");
const middlewareJoi = require("../../helper/joi_middleware");
const schemas = require("../../helper/joi_schemas");

// router.post(
//   "/",
//   middlewareJoi(schemas.jwt(schemas.flightPOST)),
//   middlewareJWT(types.management),
//   (req, res) => {
//     flight
//       .addFlight(req.body.data)
//       .then(result => {
//         response.data(res, 200, { message: "Successfully added" });
//       })
//       .catch(error => {
//         response.error(res, 500, "server_error", "Server Error", error);
//       });
//   }
// );

router.get("/", (req, res) => {
  console.log(req, req.params);
  schedule.getScheduleToday()
    .then(result => {
      response.data(res, 200, result);
    })
    .catch(err => {
      response.error(res, 500, "server_error", "Server Error", err);
    });
});

// router.delete(
//   "/",
//   middlewareJoi(schemas.jwt(schemas.flightDELETE)),
//   middlewareJWT(types.management),
//   (req, res) => {
//     flight
//       .deleteFlight(req.body.data.flight_id)
//       .then(result => {
//         if (result) {
//           response.data(res, 200, { message: "Successfully deleted" });
//         } else {
//           response.error(res,404,"not found","Flight not found")
//         }
//       })
//       .catch(err => {
//         response.error(res, 500, "server_error", "Server Error", err);
//       });
//   }
// );

// router.post(
//   "/schedule",
//   middlewareJoi(schemas.jwt(schemas.flightSchedulePOST)),
//   middlewareJWT(types.management),
//   (req, res) => {
//     flight.scheduleFlights().then((result) => {
//       if (result) {
//         response.data(res, 200, { message: "Successfully scheduled" });
//       } else {
//         response.data(res, 200, { message: "Already scheduled" });
//       }
//     }).catch((err) => {
//       response.error(res, 500, "server_error", "Server Error", err);
//     });
//   }
// );

module.exports = router;
