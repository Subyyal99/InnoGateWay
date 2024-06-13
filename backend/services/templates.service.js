/**
 * constant database (db) variable to access models 
 */
const db = require("../models/index.js");
/**
 * Class to create a templates service object
 */
class templatesService {
    constructor() {}
    /**
     * function to save template 
     * @param data template data
     * @returns data
     */
    async saveTemplate(data) {
        return await db.templates.create(data);
    }
    /**
     * function to get template 
     * @param data template data
     * @returns templates
     */
    async getTemplates() {
        return await db.templates.findAll();
    }

}
module.exports = templatesService;