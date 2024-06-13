/**
 * including jwtwebtoken library
 */
const jwt = require("jsonwebtoken");
/**
 * including config file
 */
const config = require("../config/key.js");
/**
 * middleware function to verify user roles 
 */
verifyUserRole = (params) => {
  return (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).send({
        auth: false,
        message: "UnAuthorized Access",
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {

      if (err) {
        return res.status(401).send({
          auth: false,
          message: "Failed To Authenticate. Error: " + err,
        });
      }
      req.userId = decoded.id;
      if (params.length > 0 && !params.find((item) => item == decoded.role)) {
        return res.status(401).send({
          auth: false,
          message: "Permission Denied. Error: " + err,
        });
      }

      next();
    });
  }
};
/**
 * middleware function to verify token 
 */
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({
      auth: false,
      message: "UnAuthorized Access",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {

    if (err) {
      return res.status(401).send({
        auth: false,
        message: "Failed To Authenticate. Error: " + err,
      });
    }
    req.userId = decoded.id;
    next();
  });
};
/**
 * middleware function to get user id
 */
getUserId = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    req.userId = "";
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        req.userId = "";
      } else {
        req.userId = decoded.id;
      }
    });
  }
  next();
};
/**
 * authJwt object exports functions in the router file
 */
const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.verifyUserRole = verifyUserRole;
authJwt.getUserId = getUserId;
/**
 * Documentaion for an Object
 * authJwtObject is exported to be used in other files
 * @authJwt
 */
module.exports = authJwt;