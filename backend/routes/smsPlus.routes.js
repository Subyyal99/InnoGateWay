/**
 * SmsPlus_Routes module
 * @module SMS_Routes
 */
/**
 * the routings for SmsPlus functions are written in this file
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
 * including Sms Plus Controller object to access controller functions
 */
const SmsPlusController = require("../controllers/smsPlus.controller");
/**
 * middleware imported to use in routes 
 */
const checkAuth = require("../middleware/verifyJwtToken");
/**
 * get type router call to get sms plus messages
 */
router.get("/get-messages", [checkAuth.verifyToken], SmsPlusController.getMessages);
/**
 * get type router call to get sms plus check keyword messages
 */
router.get("/get-check-keyword-messages", [checkAuth.verifyToken], SmsPlusController.getCheckKeywordMessages);
/**
 * get type router call to get sms plus balance deduction messages
 */
router.get("/get-balance-deduction-messages", [checkAuth.verifyToken], SmsPlusController.getBalanceDeductionMessages);
/**
 * get type router call to get sms plus successfull messages
 */
router.get("/get-successfull-messages", [checkAuth.verifyToken], SmsPlusController.getSuccessfullMessages);
/**
 * get type router call to get sms plus sent messages
 */
router.get("/get-sent-messages", [checkAuth.verifyToken], SmsPlusController.getSentMessages);
/**
 * get type router call to save sms plus messages
 */
router.post("/save-custom-message", SmsPlusController.saveCustomMessage);
/**
 * get type router call to get all sms plus custom messages
 */
router.get("/get-all-custom-message", SmsPlusController.getAllCustomMessage);
/**
 * post type router call to get specific sms plus custom messages
 */
router.post("/get-custom-message", SmsPlusController.getCustomMessage);
/**
 * get type router call to get sms plus all message count
 */
router.get("/get-all-count", [checkAuth.verifyToken], SmsPlusController.getAllCount);
/**
 * get type router call to get televoting sent messages
 */
router.get("/get-all-televoting-count", [checkAuth.verifyToken], SmsPlusController.getAllTelevotingCount);
/**
 * get type router call to get sms plus chart data
 */
router.post("/get-chart-data", [checkAuth.verifyToken], SmsPlusController.getChartData);
/**
 * get type router call to get televoting chart data
 */
router.post("/get-televoting-chart-data", [checkAuth.verifyToken], SmsPlusController.getTelevotingChartData);
/**
 * get type router call to get sms plus debit chart data
 */
router.post("/get-debit-chart-data", [checkAuth.verifyToken], SmsPlusController.getDebitChartData);
/**
 * get type router call to get televoting debit chart data
 */
router.post("/get-televoting-debit-chart-data", [checkAuth.verifyToken], SmsPlusController.getTelevotingDebitChartData);
/**
 * post type router call to get message details
 */
router.post("/get-message-detail", [checkAuth.verifyToken], SmsPlusController.getMessageDetail);
/**
 * get type router call to get message service allowed to user
 */
router.get("/get-user-message-services", [checkAuth.verifyToken], SmsPlusController.getMessageServices);
/**
 * get type router call to get error message
 */
router.get("/get-error-messages", [checkAuth.verifyToken], SmsPlusController.getErrorMessages);
/**
 * get type router call to get other type messages
 */
router.get("/get-others-messages", [checkAuth.verifyToken], SmsPlusController.getOthersMessages);
/**
 * Documentaion for an Router Object
 * router Object is exported to be used in other files
 * @router
 */
module.exports = router;