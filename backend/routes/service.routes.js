/**
 * Service_Routes module
 * @module Service_Routes
 */
/**
 * the routings for service functions are written in this file
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
 * including Service Controller object to access controller functions
 */
const ServiceController = require("../controllers/service.controller");
/**
 * middleware imported to use in routes 
 */
const checkAuth = require("../middleware/verifyJwtToken");
/**
 * get type router call to get all services
 */
router.get("/get-all-services", ServiceController.getAllServices);
/**
 * post type router call to get user services
 */
router.post("/get-user-services", ServiceController.getUserServices);
/**
 * post type router call to delete user service
 */
router.post("/delete-user-service", ServiceController.deleteUserService);
/**
 * post type router call to get service by name
 */
router.post("/get-service-by-name", ServiceController.getServiceByName);
/**
 * get type router call to check user services
 */
router.get("/check-user-service", [checkAuth.verifyToken], ServiceController.checkUserServices);
/**
 * post type router call toadd user services
 */
router.post("/add-user-service", [checkAuth.verifyToken], ServiceController.addUserService);
/**
 * post type router call to get MESSAGE DATA
 */
router.post("/get-message-data", ServiceController.getMessageData);
/**
 * post type router call to UPDATE USER SERVICE DATA
 */
router.post("/update-service-data", ServiceController.updateServiceData);
/**
 * post type router call to get service id
 */
router.post("/get-service-id", ServiceController.getServiceId);
/**
 * Documentaion for an Router Object
 * router Object is exported to be used in other files
 * @router
 */
module.exports = router;