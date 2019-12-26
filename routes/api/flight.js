const router = require("express").Router();
const flight = require("../../models/flight");
const response = require("../../helper/response");
const middlewareJWT = require("../../helper/jwt_middleware");
const types = require("../../config/types");
const middlewareJoi = require("../../helper/joi_middleware");
const schemas = require("../../helper/joi_schemas");

router.post(
  "/",
  middlewareJoi(schemas.jwt(schemas.flightPOST)),
  middlewareJWT(types.management),
  (req, res) => {
    flight
      .addFlight(req.body.data)
      .then(result => {
        response.data(res, 200, { message: "Successfully added" });
      })
      .catch(error => {
        response.error(res, 500, "server_error", "Server Error", error);
      });
  }
);

router.get("/", (req, res) => {
  console.log(req, req.params);
  flight
    .getFlights()
    .then(result => {
      response.data(res, 200, result);
    })
    .catch(err => {
      response.error(res, 500, "server_error", "Server Error", err);
    });
});

router.delete(
  "/",
  middlewareJoi(schemas.jwt(schemas.flightDELETE)),
  middlewareJWT(types.management),
  (req, res) => {
    flight.deleteFlight(req.body.data.flight_id).then((result) => {
      response.data(res,200,{result:result,message:"successfully deleted"})
    }).catch((err) => {
      response.error(res, 500, "server_error", "Server Error", err);
    });
  }
);

module.exports = router;
