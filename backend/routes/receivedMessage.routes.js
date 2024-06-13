/**
 * Received_Message_Routes module
 * @module Received_Message_Routes
 */
/**
 * the routings for received message functions are written in this file
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
 * including Received Message Controller object to access controller functions
 */
const ReceivedMessageController = require("../controllers/receivedMessage.controller");
/**
 * middleware imported to use in routes 
 */
const checkAuth = require("../middleware/verifyJwtToken");
/**
 * post type router call to get received messages by getMessages function
 */
router.post("/get-messages", [checkAuth.getUserId], ReceivedMessageController.getMessages);
/**
 * Documentaion for an Router Object
 * router Object is exported to be used in other files
 * @router
 */
module.exports = router;