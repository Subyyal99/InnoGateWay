/**
 * constant database (db) variable to access models 
 */
const db = require("../models/index.js");
/**
 * Class to create a shortcode service object
 */
class ShortCodeService {
    constructor() {}
    /**
     * function to find all short code
     * @param {number} whereClause - parametres to find the shortCode
     * @returns {promise} 
     */
    async getAllShortCodes(whereClause) {
        return await db.ShortCode.findAll(whereClause);
    }
    /**
     * function to find all SMSC ids
     * @param {number} whereClause - parametres to find the smsc ids
     * @returns {promise} 
     */
    async getSmscIds(whereClause) {
        return await db.smscUserRelation.findAll(whereClause);
    }
    /**
     * function to find one shortcode
     * @param {number} whereClause - parametres to find the shorcode
     * @returns {promise} 
     */
    async getOneShortCodes(whereClause) {
        return await db.ShortCode.findOne(whereClause);
    }
    /**
     * function to find user shortcodes
     * @param {number} whereClause - parametres to find the shorcode
     * @returns {promise} 
     */
    async getUserShortCodes(whereClause) {
        return await db.ScuRelation.findAll(whereClause);
    }
    /**
     * function to send shortcode approval request 
     * @param {number} data - request data
     * @returns {promise} 
     */
    async sendShortCodeApprovalRequest(data) {
        return await db.ShortCodeApproval.upsert(data);
    }
    /**
     * function to get shortcode approval request 
     * @param {number} whereClause - parametres to find the shorcode approval requests
     * @returns {promise} 
     */
    async getShortCodeApprovalRequests(whereClause) {
        return await db.ShortCodeApproval.findAll(whereClause);
    }
    /**
     * function to get shortcode approval request by id
     * @param {number} whereClause - parametres to find the shorcode approval requests
     * @returns {promise} 
     */
    async getShortCodeApprovalRequestById(whereClause) {
        return await db.ShortCodeApproval.findOne(whereClause);
    }
    /**
     * function to get smsc by id
     * @param {number} whereClause - parametres to find the shorcode approval requests
     * @returns {promise} 
     */
    async getSmscById(whereClause) {
        return await db.Smsc.findOne(whereClause);
    }
}
module.exports = ShortCodeService;