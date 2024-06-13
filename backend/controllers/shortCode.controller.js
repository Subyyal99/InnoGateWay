/**
 * Short_Code_Controller_Functions module
 * @module Short_Code_Controller_Functions
 */
/**
 * All functions for shortcode data are in this file
 */

/**
 * short code controller object exports functions in the controller file
 */
const shortCodeController = {};
/**
 * Short Code Service file import
 */
const ShortCodeService = require("../services/shortCode.service.js");
/**
 * Short Code Service class object to access Short Code services
 */
const shortCodeServiceObj = new ShortCodeService();
/**
 * User Service file import
 */
const UserService = require("../services/user.service.js");
/**
 * User Service class object to access User services
 */
const userServiceObj = new UserService();
/**
 * constant database (db) variable to access models 
 */
const db = require("../models/index.js");
/**
 * sequelize operator variable 
 */
const {
    Op
} = require("sequelize");
/**
 * function to get all shortcodes 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
shortCodeController.getAllShortCodes = async (req, res) => {
    try {
        /**
         * function call to get all shortcodes
         */
        const shortCodes = await shortCodeServiceObj.getAllShortCodes();
        /**
         * if operation is successful the res variable carries response with successfull status,data and message 
         */
        res.status(200).send({
            code: 200,
            message: "Shortcodes retrieved Successfully",
            data: shortCodes,
        });
    } catch (error) {
        /**
         * if operation is unsuccessful the res variable carries error status 
         */
        return res.status(500).send(error);
    }
};
/**
 * function to get shortcodes allowed to user
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
shortCodeController.getAllowedShortCodes = async (req, res) => {
    try {
        /**
         * function call to get SMSCids
         */
        const allowedSmscs = await shortCodeServiceObj.getSmscIds({
            /**
             * parameter of status and user id for SMSC
             */
            where: {
                status: "Allowed",
                userId: req.userId
            },
            /**
             * the attribute to get from table
             */
            attributes: ["smscId"]
        });
        /**
         * allowedSmscs data check
         */
        if (allowedSmscs.length > 0) {
            /**
             * data is present
             */
            let smscIds = [];
            /**
             * get SMSCids from array
             */
            for (let relation of allowedSmscs) {
                smscIds.push(relation.dataValues.smscId);
            }
            /**
             * function call get short codes
             */
            const shortCodes = await shortCodeServiceObj.getAllShortCodes({
                where: {
                    smscId: smscIds,
                }
            });
            /**
             * if operation is successful the res variable carries response with successfull status,data and message 
             */
            res.status(200).send({
                code: 200,
                message: "Shortcodes retrieved Successfully",
                data: shortCodes,
            });
        } else {
            /**
             * data is absent
             */
            /**
             * if operation is successful the res variable carries response with successfull status,data and message 
             */
            res.status(200).send({
                code: 200,
                message: "No Short Codes Available",
            });
        }
    } catch (error) {
        /**
         * if operation is unsuccessful the res variable carries error status 
         */
        return res.status(500).send(error);
    }
};
/**
 * function to get shortcodes allowed to user
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
shortCodeController.getUserShortCodes = async (req, res) => {
    try {
        /**
         * function call to get user shortcodes
         */
        const shortCodes = await shortCodeServiceObj.getUserShortCodes({
            /**
             * parameters to get corret data
             */
            where: {
                userId: req.userId,
                serviceId: req.body.serviceId,
                status: "Allowed"
            },
            /**
             * data associalted with shortcode table
             */
            include: [{
                model: db.ShortCode,
                required: true
            }]
        });
        let codes = [];
        let codeId = 0
        /**
         * get shortcode ids from array
         */
        for (let relation of shortCodes) {

            if (relation.ShortCode.id != codeId) {
                codes.push(relation.ShortCode);
            }
            codeId = relation.ShortCode.id
        }
        /**
         * if operation is successful the res variable carries response with successfull status,data and message 
         */
        res.status(200).send({
            code: 200,
            message: "Shortcodes retrieved Successfully",
            data: codes,
        });
    } catch (error) {
        /**
         * if operation is unsuccessful the res variable carries error status 
         */
        return res.status(500).send(error);
    }
};
/**
 * function to send short code approval request
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
shortCodeController.sendShortCodeApprovalRequest = async (req, res) => {
    try {
        /**
         * id of the logged in user
         */
        req.body.userId = req.userId
        /**
         * billing operator 
         */
        req.body.billingOperator = req.body.billingOperator.name
        /**
         * id of the smsc the shortcode belongs to  
         */
        req.body.smscId = req.body.smsc.id
        /**
         * channel name og the shortcode
         */
        req.body.channel = req.body.channelName
        /**
         * function call to send request for the approval of a new short code
         */
        const shortCodeApproval = await shortCodeServiceObj.sendShortCodeApprovalRequest(req.body)
        /**
         * if operation is successful the res variable carries response with successfull status,data and message 
         */
        res.status(200).send({
            code: 200,
            message: "Shortcode approval request send successfully",
        });
    } catch (error) {
        /**
         * if operation is unsuccessful the res variable carries error status 
         */
        return res.status(500).send(error);
    }
};
/**
 * function to get short code approval request
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
shortCodeController.getShortCodeApprovalRequest = async (req, res) => {
    try {
        /**
         * function call to get admins created by a specific super admin
         */
        const adminsBySuperAdmin = await userServiceObj.getClients({
            where: {
                creatorId: req.userId
            },
            attributes: ["id"]
        })
        let userIds = [];
        /**
         * get ids of all the admins
         */
        for (let relation of adminsBySuperAdmin) {
            userIds.push(relation.dataValues.id);
        }
        /**
         * function all to get all shortcode approval requests by the admins in the userIds aray 
         */
        const shortCodeApprovalRequests = await shortCodeServiceObj.getShortCodeApprovalRequests({
            /**
             * admin ids and status of request
             */
            where: {
                userId: userIds,
                status: "Pending Super Admin"
            },
            /**
             * associated data to include
             */
            include: [{
                model: db.User,
                required: true,
                attributes: ["firstName", "lastName"]
            }]
        })
        /**
         * if operation is successful the res variable carries response with successfull status,data and message 
         */
        res.status(200).send({
            code: 200,
            message: "Shortcode approval request send successfully",
            data: shortCodeApprovalRequests
        });
    } catch (error) {
        /**
         * if operation is unsuccessful the res variable carries error status 
         */
        return res.status(500).send(error);
    }
};
/**
 * function to get short code approval request by id
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
shortCodeController.getShortCodeApprovalRequestById = async (req, res) => {
    try {
        /**
         * function call to get a specific shortcode approval request
         */
        const shortCodeApprovalRequestById = await shortCodeServiceObj.getShortCodeApprovalRequestById({
            where: {
                id: req.body.id
            },

        })
        const smsc = await shortCodeServiceObj.getSmscById({
            where: {
                id: shortCodeApprovalRequestById.dataValues.smscId
            },

        })
        /**
         * if operation is successful the res variable carries response with successfull status,data and message 
         */
        res.status(200).send({
            code: 200,
            message: "Shortcode approval request retrieved by id successfully",
            shortCodeRequestData: shortCodeApprovalRequestById,
            smscData: smsc
        });
    } catch (error) {
        /**
         * if operation is unsuccessful the res variable carries error status 
         */
        return res.status(500).send(error);
    }
};
/**
 * function to update short code approval request
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
shortCodeController.updateShortCodeApprovalRequest = async (req, res) => {
    try {
        /**
         * status of the request 
         */
        req.body.status = "Pending Configuration"
        /**
         * function all to update request after super admin works on it
         */
        const shortCodeApproval = await shortCodeServiceObj.sendShortCodeApprovalRequest(req.body)
        /**
         * if operation is successful the res variable carries response with successfull status,data and message 
         */
        res.status(200).send({
            code: 200,
            message: "Shortcode approval request send successfully",
        });
    } catch (error) {
        /**
         * if operation is unsuccessful the res variable carries error status 
         */
        return res.status(500).send(error);
    }
};
/**
 * function to get short code Edited request
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
shortCodeController.getShortCodeEditedRequest = async (req, res) => {
    try {
        /**
         * function call to get admins created by a specific super admin
         */
        const adminsBySuperAdmin = await userServiceObj.getClients({
            where: {
                creatorId: req.userId
            },
            attributes: ["id"]
        })
        let userIds = [];
        /**
         * get ids of all the admins
         */
        for (let relation of adminsBySuperAdmin) {
            userIds.push(relation.dataValues.id);
        }
        /**
         * function all to get all shortcode approval requests by the admins in the userIds aray 
         */
        const shortCodeApprovalRequests = await shortCodeServiceObj.getShortCodeApprovalRequests({
            where: {
                userId: userIds,
                [Op.or]: [{
                    status: "Pending Configuration"
                }, {
                    status: "Accepted"
                }, {
                    status: "Rejected"
                }]
            },
            include: [{
                model: db.User,
                required: true,
                attributes: ["firstName", "lastName"]
            }]
        })
        /**
         * if operation is successful the res variable carries response with successfull status,data and message 
         */
        res.status(200).send({
            code: 200,
            message: "Shortcode approval request send successfully",
            data: shortCodeApprovalRequests
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
 * ShortCode Controller Object is exported to be used in other files
 * @shortCodeController
 */
module.exports = shortCodeController;