const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
const response = require("../helper/response");

const middlewareJWT = type => {
  var payload;
  return (req, res, next) => {
    try {
      if (req.body.jwt) {
        payload = jwt.verify(req.body.jwt, jwtConfig.secret);
        if (payload.type === type) {
          req.user_id = payload.id
          next();
        } else {
          response.error(
            res,
            401,
            "unauthorized",
            "You haven`t admin privileges"
          );
        }
      } else {
        response.error(res, 401, "unauthorized", "Authentication failed");
      }
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        response.error(res, 401, e.name, e.message);
      }
      response.error(res, 400, e.name, e.message);
    }
  };
};

module.exports = middlewareJWT;
