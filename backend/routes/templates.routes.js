/**
 * Templates_Routes module
 * @module SMS_Routes
 */
/**
 * the routings for Templates functions are written in this file
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
 * including templates Controller object to access controller functions
 */
const TemplatesController = require("../controllers/templates.controller");
/**
 * post type router call to save templates
 */
router.post("/save-template", TemplatesController.saveTemplate);
/**
 * get type router call to get all templates
 */
router.get("/get-all-templates", TemplatesController.getTemplates);
/**
 * Documentaion for an Router Object
 * router Object is exported to be used in other files
 * @router
 */
module.exports = router;