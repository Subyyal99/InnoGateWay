/**
 * BlackList_Controller_Functions module
 * @module BlackList_Controller_Functions
 */
/**
 * All functions for blacklist data are in this file
 */

/**
 * service controller object exports functions in the controller file
 */
const serviceController = {};
/**
 * constant database (db) variable to access models 
 */
const db = require("../models/index.js");
/**
 * Service Service file import
 */
const serviceService = require("../services/service.service.js");
/**
 * Service Service class object to access Service services
 */
const serviceServiceObj = new serviceService();

/**
 * function to get all service 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
serviceController.getAllServices = async (req, res) => {
    try {
        /**
         * function call to get services
         */
        const allServices = await serviceServiceObj.getServices();
        /**
         * if operation is successful the res variable carries response with successfull status,data and message 
         */
        res.status(200).send({
            code: 200,
            message: "All Services Recieved Successfully!",
            data: allServices,

        });
    } catch (error) {
        /**
         * if operation is unsuccessful the res variable carries error status 
         */
        return res.status(500).send(error);
    }
};
/**
 * function to get user services 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
serviceController.getUserServices = async (req, res) => {
    try {
        /**
         * function call to get user services
         */
        const userServices = await serviceServiceObj.getUserServices({
            /**
             * specific parametres with id and is deleted
             */
            where: {
                userId: req.body.id,
                isDeleted: "0"
            },
            /**
             * includes associated data with service database table
             */
            include: [{
                model: db.Service,
                required: true,
            }, ],
        });
        /**
         * function call to get message data
         */
        const messageData = await serviceServiceObj.getMessageData({
            /**
             * specific parametres with id 
             */
            where: {
                userId: req.body.id
            },
            /**
             * includes associated data with service database table
             */
            include: [{
                    model: db.Service,
                    required: true,
                },
                /**
                 * includes associated data with short code database table
                 */
                {
                    model: db.ShortCode,
                    required: true,
                },
            ],
        });
        /**
         * if operation is successful the res variable carries response with successfull status,data and message 
         */
        res.status(200).send({
            code: 200,
            message: "User Services!",
            data: userServices,
            messageData: messageData,

        });
    } catch (error) {
        /**
         * if operation is unsuccessful the res variable carries error status 
         */
        return res.status(500).send(error);
    }
};
/**
 * function to get user services 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
serviceController.deleteUserService = async (req, res) => {
    try {
        /**
         * function call to check service allowed to user 
         */
        const serviceId = await serviceServiceObj.checkAllowServce({
            /**
             * user parameters 
             */
            where: {
                serviceId: req.body.serviceId,
                userId: req.body.userId
            }
        });
        req.body.id = serviceId.dataValues.id
        req.body.status = "Not Allowed"
        req.body.isDeleted = "1"
        /**
         * function call to delete user service
         */
        const deleteUserService = await serviceServiceObj.deleteUserService(req.body);
        /**
         * if operation is successful the res variable carries response with successfull status,data and message 
         */
        res.status(200).send({
            code: 200,
            message: "User service deleted successfully!",
            data: deleteUserService,

        });
    } catch (error) {
        /**
         * if operation is unsuccessful the res variable carries error status 
         */
        return res.status(500).send(error);
    }
};
/**
 * function to check user services 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
serviceController.checkUserServices = async (req, res) => {
    try {
        /**
         * function call to get services allowed to user
         */
        const userServices = await serviceServiceObj.getUserServices({
            where: {
                userId: req.userId,
                isDeleted: "0"
            },
            include: [{
                model: db.Service,
                required: true,
            }, ],
        });
        /**
         * if operation is successful the res variable carries response with successfull status,data and message 
         */
        res.status(200).send({
            code: 200,
            message: "User Services!",
            data: userServices,

        });
    } catch (error) {
        /**
         * if operation is unsuccessful the res variable carries error status 
         */
        return res.status(500).send(error);
    }
};
/**
 * function to add user services 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
serviceController.addUserService = async (req, res) => {
    try {
        /**
         * data important for user service
         */
        req.body.status = "Allowed"
        req.body.isDeleted = "0"
        req.body.serviceId = req.body.services.id
        req.body.shortCodeId = req.body.shortCode.id
        req.body.numberOfMessageAllowed = req.body.noOfMessageAllowed
        if (req.body.expireAfter) {
            req.body.expireAfter = req.body.expireAfter.toString() + " Days"
        }
        /**
         * function call to check service allowed to user 
         */
        const serviceCheck = await serviceServiceObj.checkAllowServce({
            where: {
                serviceId: req.body.serviceId,
                userId: req.body.userId,
            }
        })
        /**
         * check to see whether the service being added to user was alloted to user butt was not allowed or deleted so this check reverts it 
         */
        if (serviceCheck && serviceCheck.dataValues.status == "Not Allowed" && serviceCheck.dataValues.isDeleted == "1") {
            let obj = {
                id: serviceCheck.dataValues.id,
                serviceId: req.body.serviceId,
                userId: req.body.userId,
                status: "Allowed",
                isDeleted: "0"
            }
            const serviceUpdate = await serviceServiceObj.allowServce(obj)
        }
        /**
         * service check is true 
         */
        if (serviceCheck) {
            /**
             * function call to enter data in table for user package and relation between user and short code 
             */
            scuRelation = await serviceServiceObj.scuRelation(req.body);
            /**
             * if operation is successful the res variable carries response with successfull status,data and message 
             */
            res.status(200).send({
                code: 200,
                message: "User Service Successfully Added!",
                scuRelation: scuRelation,
            });
            // }
        }
        /**
                service check is false */
        else if (!serviceCheck) {
            /**
             * function call to allow user service
             */
            const serviceAllow = await serviceServiceObj.allowServce(req.body);
            /**
             * function call to create package and data relation between user and shortcode
             */
            const scuRelation = await serviceServiceObj.scuRelation(req.body);
            /**
             * if operation is successful the res variable carries response with successfull status,data and message 
             */
            res.status(200).send({
                code: 200,
                message: "User Service Successfully Added!",
                serviceAllow: serviceAllow,
                scuRelation: scuRelation,

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
 * function to get message data
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
serviceController.getMessageData = async (req, res) => {
    try {
        /**
         * function call to get message data
         */
        const messageData = await serviceServiceObj.getMessageData({
            /**
             * parameter user id so only a specific user's message are retreived
             */
            where: {
                userId: req.body.id
            },
            /**
             * include data associated with service
             */
            include: [{
                    model: db.Service,
                    required: true,
                },
                /**
                 * include data associated with shortCode
                 */
                {
                    model: db.ShortCode,
                    required: true,
                },
            ],
        });
        /**
         * if operation is successful the res variable carries response with successfull status,data and message 
         */
        res.status(200).send({
            code: 200,
            message: "All Services Recieved Successfully!",
            data: messageData,

        });
    } catch (error) {
        /**
         * if operation is unsuccessful the res variable carries error status 
         */
        return res.status(500).send(error);
    }
};
/**
 * function to update service data
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
serviceController.updateServiceData = async (req, res) => {
    try {
        /**
         * function call to update service data provided
         */
        const messageData = await serviceServiceObj.updateServiceData(req.body);
        /**
         * if operation is successful the res variable carries response with successfull status,data and message 
         */
        res.status(200).send({
            code: 200,
            message: "Service Updated Successfully!",
            data: messageData,

        });
    } catch (error) {
        /**
         * if operation is unsuccessful the res variable carries error status 
         */
        return res.status(500).send(error);
    }
};
/**
 * function to get service id
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
serviceController.getServiceId = async (req, res) => {
    try {
        /**
         * function all to get service id by name
         */
        const serviceId = await serviceServiceObj.getServiceId({
            /**
             * parametre name of the service
             */
            where: {
                name: req.body.name
            }
        });
        /**
         * if operation is successful the res variable carries response with successfull status,data and message 
         */
        res.status(200).send({
            code: 200,
            message: "Service Id Retrieved Successfully!",
            data: serviceId,

        });
    } catch (error) {
        /**
         * if operation is unsuccessful the res variable carries error status 
         */
        return res.status(500).send(error);
    }
};
/**
 * function to get service by name
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
serviceController.getServiceByName = async (req, res) => {
    try {
        /**
         * function all to get service by name
         */
        const userServices = await serviceServiceObj.getRequiredServices({
            /**
             * parametre name of the service
             */
            where: {
                name: req.body.name
            },
        });
        /**
         * if operation is successful the res variable carries response with successfull status,data and message 
         */
        res.status(200).send({
            code: 200,
            message: "User Service!",
            data: userServices,

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
 * Service Controller Object is exported to be used in other files
 * @serviceController
 */
module.exports = serviceController;