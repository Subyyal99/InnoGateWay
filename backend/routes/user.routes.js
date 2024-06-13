/**
 * User_Routes module
 * @module SMS_Routes
 */
/**
 * the routings for User functions are written in this file
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
 * including user Controller object to access controller functions
 */
const UserController = require("../controllers/user.controller");
/**
 * including upload helper to upload user images 
 */
const upload = require("../helpers/fileUpload");
/**
 * middleware imported to use in routes 
 */
const checkAuth = require("../middleware/verifyJwtToken");
/**
 * middleware imported to use in routes 
 */
const checkLogin = require("../middleware/blackListCheck");
/**
 * middleware imported to use in routes 
 */
const checkDuplicateEmail = require("../middleware/verifySignUp");
/**
 * post type router call to login user with middle ware to check ip of login
 */
router.post("/login", [checkLogin.checkIp], UserController.loginUser);
/**
 * post type router call to register user with middle ware to check whether the email already exists or not and to verify token
 */
router.post(
  "/register",
  [checkDuplicateEmail.checkDuplicateEmail], [checkAuth.verifyToken],
  UserController.registerUser
);
/**
 * get type router call to get all client users with middleware to verify token
 */
router.get(
  "/get-all-clients", [checkAuth.verifyToken],
  UserController.getAllClients
);
/**
 * get type router call to get all admin users with middleware to verify token
 */
router.get(
  "/get-all-admins", [checkAuth.verifyToken],
  UserController.getAllAdmins
);
/**
 * post type router call to get admin user by id with middleware to verify token
 */
router.post(
  "/get-admin-by-id",
  UserController.getAdminById
);
/**
 * post type router call to get client user 
 */
router.post(
  "/get-client",
  UserController.getClient
);
/**
 * post type router call to get client user info
 */
router.post(
  "/get-client-info",
  UserController.getClientInfo
);
/**
 * post type router call to update client user 
 */
router.post(
  "/update-client",
  UserController.getUpdateClients
);
/**
 * post type router call to delete client user 
 */
router.post(
  "/delete-clients",
  UserController.deleteClient
);
/**
 * post type router call to get client user get in touch with middle ware to verify token
 */
router.post(
  "/get-in-touch",
  [checkAuth.verifyToken],
  UserController.getInTouch
);
/**
 * get type router call to get header info with middle ware to verify token
 */
router.get(
  "/get-header-info",
  [checkAuth.verifyToken],
  UserController.getHeaderInfo
);

/**
 * get type router call to get user by id with middle ware to verify token
 */
router.get("/get-by-id", [checkAuth.verifyToken], UserController.getUserById);

/**
 * post type router call to check user email
 */
router.post("/check-email", UserController.checkEmail);
/**
 * Documentaion for an Router Object
 * router Object is exported to be used in other files
 * @router
 */
module.exports = router;