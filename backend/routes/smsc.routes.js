/**
 * SMSC_Routes module
 * @module SMS_Routes
 */
/**
 * the routings for smsc functions are written in this file
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
const SmscController = require("../controllers/smsc.controller");
/**
 * middleware imported to use in routes 
 */
const checkAuth = require("../middleware/verifyJwtToken");
/**
 * post type router call to add smsc
 */
router.post("/add-smsc", [checkAuth.verifyToken], SmscController.addSmsc);
/**
 * get type router call to get all smsc
 */
router.get("/get-all-smsc", [checkAuth.verifyToken], SmscController.getAllSmsc);
/**
 * post type router call to add admin smsc
 */
router.post("/add-admin-smscs", [checkAuth.verifyToken], SmscController.addAdminSmscs);
/**
 * post type router call to get admin smsc
 */
router.post("/get-admin-smscs", [checkAuth.verifyToken], SmscController.getAdminSmscs);
/**
 * post type router call to update admin smsc
 */
router.post("/update-admin-smsc", [checkAuth.verifyToken], SmscController.updateAdminSmsc);

/**
 * Documentaion for an Router Object
 * router Object is exported to be used in other files
 * @router
 */
module.exports = router;