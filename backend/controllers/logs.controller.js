/**
 * Logs_Controller_Functions module
 * @module Logs_Controller_Functions
 */
/**
 * All functions for logs data are in this file
 */

/**
 * logs controller object exports functions in the controller file
 */
const logsController = {};
/**
 * logs service class import to acces service file
 */
const LogsService = require("../services/logs.service.js");
/**
 * logs service new object
 */
const logsServiceObj = new LogsService();
/**
 * function to get all logs from logs table 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
logsController.getAllLogs = async (req, res) => {
    try {
        /**
         * varable to store data from call
         */
        const logs = await logsServiceObj.getAllLogs({
            /**
             * parametres to focus logs by user id
             */
            where: {
                userId: req.userId
            }
        });
        /**
         * if operation is successful the res variable carries response with successfull status,daat and message 
         */
        res.status(200).send({
            code: 200,
            message: "All Logs!",
            data: logs,
        });
    } catch (error) {
        /**
         * if operation is unsuccessful the res variable carries error status 
         */
        return res.status(500).send(error);
    }
};
/**
 * Documentaion for an Controller Object
 * logs Controller Object is exported to be used in other files
 * @logsController
 */
module.exports = logsController;