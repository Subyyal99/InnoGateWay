/**
 * Televoting_Routes module
 * @module SMS_Routes
 */
/**
 * the routings for Televoting functions are written in this file
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
 * including televoting Controller object to access controller functions
 */
const TelevotingController = require("../controllers/televoting.controller");
/**
 * middleware imported to use in routes 
 */
const checkAuth = require("../middleware/verifyJwtToken");
/**
 * get type router call to get televoting messages
 */
router.get("/get-messages", [checkAuth.verifyToken], TelevotingController.getMessages);
/**
 * get type router call to get televoting check keyword messages
 */
router.get("/get-check-keyword-messages", [checkAuth.verifyToken], TelevotingController.getCheckKeywordMessages);
/**
 * get type router call to get televoting balance deduction messages
 */
router.get("/get-balance-deduction-messages", [checkAuth.verifyToken], TelevotingController.getBalanceDeductionMessages);
/**
 * get type router call to get televoting successfull messages
 */
router.get("/get-successfull-messages", [checkAuth.verifyToken], TelevotingController.getSuccessfullMessages);
/**
 * get type router call to get televoting sent messages
 */
router.get("/get-sent-messages", [checkAuth.verifyToken], TelevotingController.getSentMessages);
/**
 * post type router call to save televoting custom messages
 */
router.post("/save-custom-message", TelevotingController.saveCustomMessage);
/**
 * get type router call to get all televoting custom messages
 */
router.get("/get-all-custom-message", TelevotingController.getAllCustomMessage);
/**
 * post type router call to get televoting custom messages
 */
router.post("/get-custom-message", TelevotingController.getCustomMessage);
/**
 * get type router call to get all televoting messages count
 */
router.get("/get-all-count", [checkAuth.verifyToken], TelevotingController.getAllCount);
/**
 * get type router call to get televoting chart data for dashboard
 */
router.post("/get-chart-data", [checkAuth.verifyToken], TelevotingController.getChartData);
/**
 * post type router call to get televoting debit chart data for dashboard
 */
router.post("/get-debit-chart-data", [checkAuth.verifyToken], TelevotingController.getDebitChartData);
/**
 * post type router call to get televoting message details
 */
router.post("/get-message-detail", TelevotingController.getMessageDetail);
/**
 * get type router call to get services allowed to user
 */
router.get("/get-user-message-services", [checkAuth.verifyToken], TelevotingController.getMessageServices);
/**
 * get type router call to get televoting error messages
 */
router.get("/get-error-messages", [checkAuth.verifyToken], TelevotingController.getErrorMessages);
/**
 * Documentaion for an Router Object
 * router Object is exported to be used in other files
 * @router
 */
module.exports = router;