/**
 * constant database (db) variable to access models 
 */
const db = require("../models/index.js");
const CustomContactFields = db.customContactFields
/**
 * Class to create a televoting service object
 */
class customContactFields {
    constructor() {}
    /**
     * function to find all televoting error messages
     * @param whereClause query operator
     * @returns error messaegs
     */
    static async create(data) {
        return await CustomContactFields.create(data);
    }
    static async bulkCreate(data) {
        return await CustomContactFields.bulkCreate(data);
    }
    static async findAll(whereClause) {
        return await CustomContactFields.findAll(whereClause);
    }
    static async findOne(whereClause) {
        return await CustomContactFields.findOne(whereClause);
    }
    static async count(whereClause) {
        return await CustomContactFields.count(whereClause);
    }

}
module.exports = customContactFields;