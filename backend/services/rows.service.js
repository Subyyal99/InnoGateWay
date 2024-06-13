/**
 * constant database (db) variable to access models 
 */
const db = require("../models/index.js");
const Rows = db.rows
/**
 * Class to create a televoting service object
 */
class rows {
    constructor() {}
    /**
     * function to find all televoting error messages
     * @param whereClause query operator
     * @returns error messaegs
     */
    static async create(data) {
        return await Rows.create(data);
    }
    static async bulkCreate(data) {
        return await Rows.bulkCreate(data);
    }
    static async findAll(whereClause) {
        return await Rows.findAll(whereClause);
    }
    static async findOne(whereClause) {
        return await Rows.findOne(whereClause);
    }
    static async count(whereClause) {
        return await Rows.count(whereClause);
    }

}
module.exports = rows;