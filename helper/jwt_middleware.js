const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
const response = require("../helper/response");

const middlewareJWT = (type, dataContainer = "body") => {
  var payload;
  return (req, res, next) => {
    try {
      if (req[dataContainer].jwt) {
        payload = jwt.verify(req[dataContainer].jwt, jwtConfig.secret);
        if (!Array.isArray(type) && payload.type === type) {
          req.user_id = payload.id;
          next();
        } else if (Array.isArray(type) && type.includes(payload.type)) {
          req.user_id = payload.id;
          next();
        } else {
          response.error(res, 401, "unauthorized", "You haven`t privileges");
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
