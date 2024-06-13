/**
 * Contact_Routes module
 * @module Contact_Routes
 */
/**
 * the routings for Contact functions are written in this file
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
 * including Contact coltroller object to access controller functions
 */
const ContactController = require("../controllers/contact.controller");
/**
 * including file upload helper to upload doucements,images,videos etc
 */
const upload = require("../helpers/fileUpload");
/**
 * includes custom made middleware to verify JWT token
 */
const checkAuth = require("../middleware/verifyJwtToken");
/**
 * post type router call to add new contact group by addNewGroup function
 */
router.post("/add-new-group", [checkAuth.verifyToken], ContactController.addNewGroup);
/**
 * get type router call to get all contact group by getAllGroups function
 */
router.post("/get-all-groups", [checkAuth.verifyToken], ContactController.getAllGroups);
/**
 * post type router call to get contact group count by getGroupContactCount function
 */
router.post("/get-group-contact-count", ContactController.getGroupContactCount);
/**
 * post type router call to get contact list by id using getGroupContactListById function
 */
router.post(
  "/get-group-contact-list", [checkAuth.verifyToken],
  ContactController.getCustomContactGroupFields
);
router.post(
  "/get-fields-contacts", [checkAuth.verifyToken],
  ContactController.getFieldsContacts
);
// router.get(
//   "/add-contacts-loop",
//   ContactController.addContactsLoop
// );
/**
 * post type router call to remove contact by removeContact function
 */
router.post("/remove-contact", ContactController.removeContact);
router.post("/remove-contact-list", ContactController.removeContactList);
router.post("/get-contact-group-fields", ContactController.getContactGroupFields);
/**
 * post type router call to upload file of contacts and then adjusting data with controller function getFile
 */
router.post(
  "/readFileName",
  upload.fields([{
    name: "contacts",
    maxCount: 1,
  }, ]),
  ContactController.getFile
);
/**
 * post type router call to read contact file data using readFileData function
 */
router.post("/read-file-data", ContactController.readFileData);
/**
 * post type router call to import contacts 
 */
router.post("/import-list", ContactController.importContacts);
/**
 * post type router call to search for contacts
 */
router.post("/search", ContactController.search);
/**
 * Documentaion for an Router Object
 * router Object is exported to be used in other files
 * @router
 */
module.exports = router;