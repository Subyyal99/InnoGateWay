/**
 * Templates_Controller_Functions module
 * @module Templates_Controller_Functions
 */
/**
 * All functions for templates data are in this file
 */

/**
 * templates controller object exports functions in the controller file
 */
const templatesController = {};
/**
 * templates service file import
 */
const TemplatesService = require("../services/templates.service.js");
/**
 * templates service class object to access templates services
 */
const templatesServiceObj = new TemplatesService();
/**
 * function to save templates
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns templates are saved
 */
templatesController.saveTemplate = async (req, res) => {
    try {
        if (req.body.from) {
            req.body.from = req.body.from.name
        }
        let data = req.body
        const template = await templatesServiceObj.saveTemplate(data);

        res.status(200).send({
            code: 200,
            message: "Template Saved Successfully",
            data: template
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to get templates 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns templates 
 */
templatesController.getTemplates = async (req, res) => {
    try {

        const templates = await templatesServiceObj.getTemplates();

        res.status(200).send({
            code: 200,
            message: "All Templates Data",
            data: templates
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * Documentaion for an Controller Object
 * Templates Controller Object is exported to be used in other files
 * @templatesController
 */

module.exports = templatesController;