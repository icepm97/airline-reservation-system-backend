const Joi = require("joi");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

const middlewareJWT = (type) => {
  var payload;
  return (req, res, next) => {
    try {
      if (req.body.jwt) {
        payload = jwt.verify(req.body.jwt, jwtConfig.secret);
        if (payload.type === type) {
          next();
        }else{
          res
          .status(401)
          .json({ error: "Authentication failed" })
          .end();
        }
      } else {
        res
          .status(401)
          .json({ error: "Authentication failed" })
          .end();
      }
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        return res
          .status(401)
          .json({ error: e })
          .end();
      }
      return res
        .status(400)
        .json({ error: e })
        .end();
    }
  };
};

module.exports = middlewareJWT;
