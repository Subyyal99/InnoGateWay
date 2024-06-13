const db = require("../models/index.js");
class errorReceivedSmsService {
    constructor() {}
    async addError(data) {
        return await db.errorReceivedSms.create(data);
    }
    async getAllErrors() {
        return await db.errorReceivedSms.findAll();
    }
    async getOneError(query) {
        return await db.errorReceivedSms.findOne(query);
    }
}
/**
 * Documentaion for an service Object
 * Error ReceivedSms Service Service Object is exported to be used in other files
 * @errorReceivedSmsService
 */
module.exports = errorReceivedSmsService;