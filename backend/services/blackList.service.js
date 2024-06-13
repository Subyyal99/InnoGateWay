/**
 * constant database (db) variable to access models 
 */
const db = require("../models/index.js");
/**
 * Class to create a blacklist service object
 */
class blackListService {
    constructor() {}
    /**
     * function to create an entry in database table blacklist ip 
     * @param {number} data - the data to enter 
     * @returns {promise} 
     */
    async blackListByIp(data) {
        return await db.blackListIp.create(data);
    }
    /**
     * function to find all entries in database table blacklist ip 
     * @returns {promise} 
     */
    async getBlackListedIps() {
        return await db.blackListIp.findAll();
    }
    /**
     * function to delete an entry by id in database table blacklist ip 
     * @param {number} id - the id of row to delete 
     * @returns {promise} 
     */
    async deleteBlackListedIps(id) {
        return await db.blackListIp.destroy({
            where: {
                id: id
            }
        });
    }
    /**
     * function to create an entry in database table blacklist msisdn 
     * @param {number} data - the data to enter 
     * @returns {promise} 
     */
    async blackListByMsisdn(data) {
        return await db.blackListMsisdn.create(data);
    }
    /**
     * function to find all entries in database table blacklist msisdn 
     * @returns {promise} 
     */
    async getBlackListedMsisdns() {
        return await db.blackListMsisdn.findAll();
    }
    /**
     * function to delete an entry by id in database table blacklist msisdn 
     * @param {number} id - the id of row to delete 
     * @returns {promise} 
     */
    async deleteBlackListedMsisdns(id) {
        return await db.blackListMsisdn.destroy({
            where: {
                id: id
            }
        });
    }
}
module.exports = blackListService;