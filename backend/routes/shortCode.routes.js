/**
 * Short_Code_Routes module
 * @module Short_Code_Routes
 */
/**
 * the routings for short code functions are written in this file
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
 * including ShortCode Controller object to access controller functions
 */
const ShortCodeController = require("../controllers/shortCode.controller");
/**
 * middleware imported to use in routes 
 */
const checkAuth = require("../middleware/verifyJwtToken");
/**
 * get type router call to get all shortcodes
 */
router.get("/get-all", ShortCodeController.getAllShortCodes);
/**
 * get type router call to get allowed shortcodes
 */
router.get("/get-allowed-codes", [checkAuth.verifyToken], ShortCodeController.getAllowedShortCodes);
/**
 * post type router call to get user shortcodes
 */
router.post("/get-user-short-code", [checkAuth.verifyToken], ShortCodeController.getUserShortCodes);
/**
 * post type router call to send shortcode approval request
 */
router.post("/send-short-code-approval-request", [checkAuth.verifyToken], ShortCodeController.sendShortCodeApprovalRequest);
/**
 * get type router call to get shortcode approval request
 */
router.get("/get-short-code-approval-requests", [checkAuth.verifyToken], ShortCodeController.getShortCodeApprovalRequest);
/**
 * get type router call to get shortcode edited request
 */
router.get("/get-short-code-edited-requests", [checkAuth.verifyToken], ShortCodeController.getShortCodeEditedRequest);
/**
 * post type router call to get shortcode approval request by id
 */
router.post("/get-short-code-approval-request-by-id", [checkAuth.verifyToken], ShortCodeController.getShortCodeApprovalRequestById);
/**
 * post type router call to update shortcode approval request
 */
router.post("/update-short-code-approval-request", [checkAuth.verifyToken], ShortCodeController.updateShortCodeApprovalRequest);
/**
 * Documentaion for an Router Object
 * router Object is exported to be used in other files
 * @router
 */
module.exports = router;