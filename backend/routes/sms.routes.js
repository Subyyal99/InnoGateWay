/**
 * SMS_Routes module
 * @module SMS_Routes
 */
/**
 * the routings for sms functions are written in this file
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
 * including Sms Controller object to access controller functions
 */
const SmsController = require("../controllers/sms.controller");
/**
 * middleware imported to use in routes 
 */
const checkAuth = require("../middleware/verifyJwtToken");
/**
 * middleware imported to use in routes 
 */
const checkLogin = require("../middleware/blackListCheck");
/**
 * post type router call to send sms
 */
router.post("/send", [checkAuth.verifyToken], SmsController.sendSms);
/**
 * get type router call to get single sms
 */
router.get("/get-single-sms", [checkAuth.verifyToken], SmsController.getSingleSMS);
/**
 * get type router call to bulk sms
 */
router.get("/get-bulk-sms", [checkAuth.verifyToken], SmsController.getBulkSMS);
/**
 * post type router call to send sms by api
 */
router.post("/send-by-api", SmsController.sendSmsByApi);
/**
 * post type router call to send bulk sms
 */
router.post("/send-bulk", [checkAuth.verifyToken], SmsController.sendBulkSms);
/**
 * post type router call to send merge sms
 */
router.post("/send-merge", SmsController.sendMergeSms);
/**
 * get type router call to get received sms
 */
router.get("/receive", [checkLogin.checkMsisdn], SmsController.receiveSms);
/**
 * post type router call to save campaign
 */
router.post("/save-campaign", [checkAuth.verifyToken], SmsController.saveCampaign);
/**
 * post type router call to get campaign chart data
 */
router.post("/get-campaign-chart-data", [checkAuth.verifyToken], SmsController.getCampaignGraphData);
/**
 * get type router call to get campaigns
 */
router.get("/get-campaigns", [checkAuth.verifyToken], SmsController.getCampaigns);
/**
 * post type router call to get single specific campaign
 */
router.post("/get-campaign", SmsController.getCampaign);
/**
 * post type router call to get campaign reporting data
 */
router.post("/get-campaign-report", SmsController.getCampaignReport);
/**
 * post type router call to get sms count
 */
router.post("/count", [checkAuth.verifyToken], SmsController.getSmsCount);
/**
 * post type router call to send campaign messages
 */
router.post("/send-campaign", [checkAuth.verifyToken], SmsController.sendCampaign);
/**
 * get type router call to get all message counts
 */
router.get("/get-all-message-count", [checkAuth.verifyToken], SmsController.getMessageCounts);
/**
 * Documentaion for an Router Object
 * router Object is exported to be used in other files
 * @router
 */
module.exports = router;