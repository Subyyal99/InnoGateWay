/**
 * Logs_Routes module
 * @module Logs_Routes
 */
/**
 * the routings for logs functions are written in this file
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
 * including logs coltroller object to access controller functions
 */
const LogsController = require("../controllers/logs.controller");
/**
 * middleware imported to use in routes 
 */
const checkAuth = require("../middleware/verifyJwtToken");
/**
 * get type router call to get all logs by getAllLogs function
 */
router.get("/get-all-logs", [checkAuth.verifyToken], LogsController.getAllLogs);
/**
 * Documentaion for an Router Object
 * router Object is exported to be used in other files
 * @router
 */
module.exports = router;