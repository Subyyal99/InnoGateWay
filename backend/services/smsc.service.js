/**
 * constant database (db) variable to access models 
 */
const db = require("../models/index.js");
/**
 * Class to create a smsc service object
 */
class SmsService {
    constructor() {}
    /**
     * function call to add smsc 
     * @returns smsc added
     */
    async addSmsc(data) {
        return await db.Smsc.create(data);
    }
    /**
     * function call to get all smsc 
     * @returns required data
     */
    async getAllSmsc() {
        return await db.Smsc.findAll();
    }
    /**
     * function to add admin smsc
     * @param data data required to create entry in db
     * @returns required data
     */
    async AdminSmsc(data) {
        return await db.smscUserRelation.upsert(data);
    }
    /**
     * function to find all users smsc
     * @param whereClause to specify data in db
     * @returns required data
     */
    async getAdminSmscs(whereClause) {
        return await db.smscUserRelation.findAll(whereClause);
    }
    /**
     * function to find one admin smsc
     * @param whereClause to specify data in db
     * @returns required data
     */
    async checkAdminSmsc(whereClause) {
        return await db.smscUserRelation.findOne(whereClause);
    }
}

module.exports = SmsService;