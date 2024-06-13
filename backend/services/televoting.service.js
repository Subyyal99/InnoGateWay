/**
 * constant database (db) variable to access models 
 */
const db = require("../models/index.js");
/**
 * Class to create a televoting service object
 */
class televotingService {
    constructor() {}
    /**
     * function to find all televoting error messages
     * @param whereClause query operator
     * @returns error messaegs
     */
    async getErrorMessages(whereClause) {
        return await db.errorReceivedSms.findAll(whereClause);
    }

}
module.exports = televotingService;