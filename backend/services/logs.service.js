/**
 * constant database (db) variable to access models 
 */
const db = require("../models/index.js");
/**
 * Logs service class 
 */
class LogsService {
    constructor() {}
    /**
     * function to get all logs
     * @param whereClause - addition call parametres 
     * @returns {promise} 
     */
    async getAllLogs(whereClause) {
        return await db.logs.findAll(whereClause);
    }

}
/**
 * Documentaion for an service Object
 * Logs Service Object is exported to be used in other files
 * @LogsService
 */
module.exports = LogsService;