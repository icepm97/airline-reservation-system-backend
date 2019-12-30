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
  schedule
    .getScheduleToday()
    .then(result => {
      response.data(res, 200, result);
    })
    .catch(err => {
      response.error(res, 500, "server_error", "Server Error", err);
    });
});

router.put(
  "/",
  middlewareJoi(schemas.jwt(schemas.schedulePUT)),
  middlewareJWT(types.management),
  (req, res) => {
    schedule
      .changeState(req.body.data)
      .then(result => {
        if (result) response.data(res, 200, { message: "Update Success" });
        else response.data(res, 200, { message: "Update failed" });
      })
      .catch(err => {
        response.error(res, 500, "server_error", "Server Error", err);
      });
  }
);

router.get("/history/:route_id", middlewareJoi(schemas.jwtGET,"query"),middlewareJWT(types.management,"query"), (req, res) => {
  schedule
    .getHistory(req.params.route_id)
    .then(result => {
      response.data(res,200,result)
    })
    .catch(err => {
      response.error(res, 500, "server_error", "Server Error", err);
    });
});

module.exports = router;
