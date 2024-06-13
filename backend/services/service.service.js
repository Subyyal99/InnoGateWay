/**
 * constant database (db) variable to access models 
 */
const db = require("../models/index.js");
/**
 * Class to create a service service object
 */
class serviceService {
    constructor() {}
    /**
     * function to find all service
     * @returns {promise} 
     */
    async getServices() {
        return await db.Service.findAll();
    }
    /**
     * function to find one service 
     * @param {number} whereClause - parametres to find the service
     * @returns {promise} 
     */
    async getRequiredServices(whereClause) {
        return await db.Service.findOne(whereClause);
    }
    /**
     * function to find all service by parametres
     * @param {number} whereClause - parametres across which to find all services
     * @returns {promise} 
     */
    async getServicesIds(whereClause) {
        return await db.Service.findAll(whereClause);
    }
    /**
     * function to find all services allowed to user by parametres
     * @param {number} whereClause - parametres across which to find all services
     * @returns {promise} 
     */
    async getUserServices(whereClause) {
        return await db.ServiceAllow.findAll(whereClause);
    }
    /**
     * function to delete service allowed to user by parametres
     * @param {number} data - parametres across which to find all services
     * @returns {promise} 
     */
    async deleteUserService(data) {
        return await db.ServiceAllow.upsert(data);
    }
    /**
     * function to find one service
     * @param {number} whereClause - parametres across which to find service
     * @returns {promise} 
     */
    async checkAllowServce(whereClause) {
        return await db.ServiceAllow.findOne(whereClause);
    }
    /**
     * function to allow service to user by parametres
     * @param {number} data - data req to allow service to user
     * @returns {promise} 
     */
    async allowServce(data) {
        return await db.ServiceAllow.upsert(data);
    }
    /**
     * function to create package and relation between user and shortcode data 
     * @param {number} data - data req to add package to user
     * @returns {promise} 
     */
    async scuRelation(data) {
        return await db.ScuRelation.upsert(data);
    }
    /**
     * function to update package and relation between user and shortcode data 
     * @param {number} data - data req to update package to user
     * @returns {promise} 
     */
    async updateScuRelation(data) {
        return await db.ScuRelation.upsert(data);
    }
    /**
     * function to find all message data from packags
     * @param {number} whereClause - parametres across which to find messages
     * @returns {promise} 
     */
    async getMessageData(whereClause) {
        return await db.ScuRelation.findAll(whereClause);
    }
    /**
     * function to update service data in package and relation between user and shortcode data 
     * @param {number} data - data req to update package to user
     * @returns {promise} 
     */
    async updateServiceData(data) {
        return await db.ScuRelation.upsert(data);
    }
    /**
     * function to find service id of specific service
     * @param {number} whereClause - parametres across which to find service
     * @returns {promise} 
     */
    async getServiceId(whereClause) {
        return await db.Service.findOne(whereClause);
    }
    /**
     * function to check package data 
     * @param {number} whereClause - parametres across which to check data
     * @returns {promise} 
     */
    async checkScurelation(whereClause) {
        return await db.ScuRelation.findOne(whereClause);
    }
}
module.exports = serviceService;