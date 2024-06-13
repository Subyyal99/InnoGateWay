/**
 * BlackList_Routes module
 * @module BlackList_Routes
 */
/**
 * the routings for blacklist functions are written in this file
 */
/**
 * functions refernece return
 */
const express = require("express");
/**
 * functions refernece call for router
 */
const router = express.Router();
/**
 * including blacklist coltroller object to access controller functions
 */
const BlackListController = require("../controllers/blackList.controller.js");
/**
 * includes custom made middleware to verify JWT token
 */
const checkAuth = require("../middleware/verifyJwtToken");
/**
 * post type router call to blacklist user by ip controller function
 * checkAuth middle ware is used to get userId to use in function
 */
router.post("/by-ip", [checkAuth.getUserId], BlackListController.byIp);
/**
 * get type router call to get blacklisted ips from data base by getBlackListedIps function
 */
router.get("/get-blackListed-ips", BlackListController.getBlackListedIps);
/**
 * post type router call to remove blacklisted ips from data base by removeBlackListedIps function
 */
router.post(
  "/remove-blackListed-ips",
  BlackListController.removeBlackListedIps
);
/**
 * post type router call to blacklist user by msisdn controller function
 * checkAuth middle ware is used to get userId to use in function
 */
router.post("/by-msisdn", [checkAuth.getUserId], BlackListController.byMsisdn);
/**
 * get type router call to get blacklisted msisdns from data base by getBlackListedMsisdns function
 */
router.get(
  "/get-blackListed-msisdns",
  BlackListController.getBlackListedMsisdns
);
/**
 * post type router call to remove blacklisted msisdns from data base by removeBlackListedMsisdns function
 */
router.post(
  "/remove-blackListed-msisdn",
  BlackListController.removeBlackListedMsisdns
);
/**
 * Documentaion for an Router Object
 * router Object is exported to be used in other files
 * @router
 */
module.exports = router;