/**
 * Televoting_Controller_Functions module
 * @module Televoting_Controller_Functions
 */
/**
 * All functions for televoting data are in this file
 */

/**
 * smsPlus controller object exports functions in the controller file
 */
const smsPlusController = {};
/**
 * smsPlus service file import
 */
const SmsPlusService = require("../services/smsPlus.service.js");
/**
 * smsPlus service class object to access smsPlus services
 */
const smsPlusServiceObj = new SmsPlusService();
/**
 * services service file import
 */
const serviceService = require("../services/service.service.js");
/**
 * services service class object to access services services
 */
const serviceServiceObj = new serviceService();
/**
 * televoting service file import
 */
const televotingService = require("../services/televoting.service.js");
/**
 * televoting service class object to access televoting services
 */
const televotingServiceObj = new televotingService();
/**
 * icluding models file
 */
const db = require("../models/index.js");
/**
 * include sequelize library
 */
var sequelize = require("sequelize");
/**
 * including moment library
 */
const moment = require("moment");
/**
 * including operations variable from sequelize
 */
const {
    Op
} = require("sequelize");
/**
 * function to get televoting sms from table
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns televoting sms
 */
smsPlusController.getMessages = async (req, res) => {
    try {
        const service = await serviceServiceObj.getRequiredServices({
            where: {
                name: "Televoting"
            },
        });
        const scurelationData = await serviceServiceObj.getMessageData({
            where: {
                serviceId: service.id,
                status: "Allowed",
                userId: req.userId
            },
            include: [{
                model: db.ShortCode,
                required: true
            }]
        });
        let codes = [];
        for (let relation of scurelationData) {
            codes.push(relation.ShortCode.id);
        }
        const receivedMessage = await smsPlusServiceObj.recievedSms({
            where: {
                shortCodeId: codes,
                type: "Televoting"
            },
        });
        let smsId = [];

        for (let relation of receivedMessage) {
            smsId.push(relation.id);
        }


        const smsPlusRecievedMessages = await smsPlusServiceObj.RecievedMessages({
            where: {
                recievedSmsId: smsId
            },
            order: [
                ["id", "DESC"]
            ],
            include: [{
                model: db.recievedSms,
                required: true,
                include: [{
                    model: db.ShortCode,
                    required: true
                }]
            }]
        });

        res.status(200).send({
            code: 200,
            message: "Televoting Recieved Messages",
            messageData: smsPlusRecievedMessages,
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to get televoting check keyword sms from table
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns televoting check keyword sms
 */
smsPlusController.getCheckKeywordMessages = async (req, res) => {

    try {
        const service = await serviceServiceObj.getRequiredServices({
            where: {
                name: "Televoting"
            },
        });
        const scurelationData = await serviceServiceObj.getMessageData({
            where: {
                serviceId: service.id,
                status: "Allowed",
                userId: req.userId
            },
            include: [{
                model: db.ShortCode,
                required: true
            }]
        });
        let codes = [];
        for (let relation of scurelationData) {
            codes.push(relation.ShortCode.id);
        }
        const receivedMessage = await smsPlusServiceObj.recievedSms({
            where: {
                shortCodeId: codes,
                type: "Televoting"
            },
        });
        let smsId = [];

        for (let relation of receivedMessage) {
            smsId.push(relation.id);
        }

        const checkKeywordMessages = await smsPlusServiceObj.TCheckKeywordMessages({
            where: {
                recievedSmsId: smsId
            },
            order: [
                ["id", "DESC"]
            ],
            include: [{
                model: db.recievedSms,
                required: true,
                include: [{
                    model: db.ShortCode,
                    required: true
                }]
            }]
        });

        res.status(200).send({
            code: 200,
            message: "Televoting Check Keyword Messages",
            messageData: checkKeywordMessages
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to get televoting Balance Deduction sms from table
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns televoting Balance Deduction sms
 */
smsPlusController.getBalanceDeductionMessages = async (req, res) => {
    try {
        const service = await serviceServiceObj.getRequiredServices({
            where: {
                name: "Televoting"
            },
        });
        const scurelationData = await serviceServiceObj.getMessageData({
            where: {
                serviceId: service.id,
                status: "Allowed",
                userId: req.userId
            },
            include: [{
                model: db.ShortCode,
                required: true
            }]
        });
        let codes = [];
        for (let relation of scurelationData) {
            codes.push(relation.ShortCode.id);
        }
        const receivedMessage = await smsPlusServiceObj.recievedSms({
            where: {
                shortCodeId: codes,
                type: "Televoting"
            },
        });
        let smsId = [];

        for (let relation of receivedMessage) {
            smsId.push(relation.id);
        }

        const balanceDeductionMessages = await smsPlusServiceObj.BalanceDeductionMessages({
            where: {
                recievedSmsId: smsId
            },
            order: [
                ["id", "DESC"]
            ],
            include: [{
                model: db.recievedSms,
                required: true,
                include: [{
                    model: db.teleVotingCheckKeyword,
                    required: true
                }]
            }]
        });

        res.status(200).send({
            code: 200,
            message: "Televoting Balance Deduction Messages",
            messageData: balanceDeductionMessages
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to get televoting successfull sms from table
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns televoting successfull sms
 */
smsPlusController.getSuccessfullMessages = async (req, res) => {
    try {
        const service = await serviceServiceObj.getRequiredServices({
            where: {
                name: "Televoting"
            },
        });
        const scurelationData = await serviceServiceObj.getMessageData({
            where: {
                serviceId: service.id,
                status: "Allowed",
                userId: req.userId
            },
            include: [{
                model: db.ShortCode,
                required: true
            }]
        });
        let codes = [];
        for (let relation of scurelationData) {
            codes.push(relation.ShortCode.id);
        }
        const receivedMessage = await smsPlusServiceObj.recievedSms({
            where: {
                shortCodeId: codes,
                type: "Televoting"
            },
        });
        let smsId = [];

        for (let relation of receivedMessage) {
            smsId.push(relation.id);
        }

        const successfullMessages = await smsPlusServiceObj.SuccessfullMessages({
            where: {
                recievedSmsId: smsId
            },
            order: [
                ["id", "DESC"]
            ],
            include: [{
                model: db.recievedSms,
                required: true,
                include: [{
                    model: db.ShortCode,
                    required: true
                }]
            }]
        });

        res.status(200).send({
            code: 200,
            message: "Televoting Successfull Messages",
            messageData: successfullMessages
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to get televoting sent sms from table
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns televoting sent sms
 */
smsPlusController.getSentMessages = async (req, res) => {
    try {
        const service = await serviceServiceObj.getRequiredServices({
            where: {
                name: "Televoting"
            },
        });
        const scurelationData = await serviceServiceObj.getMessageData({
            where: {
                serviceId: service.id,
                status: "Allowed",
                userId: req.userId
            },
            include: [{
                model: db.ShortCode,
                required: true
            }]
        });
        let codes = [];
        for (let relation of scurelationData) {
            codes.push(relation.ShortCode.id);
        }
        const receivedMessage = await smsPlusServiceObj.recievedSms({
            where: {
                shortCodeId: codes,
                type: "Televoting"
            },
        });
        let smsId = [];

        for (let relation of receivedMessage) {
            smsId.push(relation.id);
        }

        const sentMessages = await smsPlusServiceObj.SentMessages({
            where: {
                recievedSmsId: smsId
            },
            order: [
                ["id", "DESC"]
            ],
            include: [{
                model: db.recievedSms,
                required: true,
                include: [{
                    model: db.ShortCode,
                    required: true
                }]
            }]
        });

        res.status(200).send({
            code: 200,
            message: "Televoting Sent Messages",
            messageData: sentMessages
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to save televoting custom sms from table
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns televoting custom sms
 */
smsPlusController.saveCustomMessage = async (req, res) => {
    try {

        req.body.shortCode = req.body.shortCode.name
        customMessage = await smsPlusServiceObj.saveCustomMessage(req.body);


        res.status(200).send({
            code: 200,
            message: "Custom message saved successfully",
            messageData: customMessage
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to get all televoting custom sms from table
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns all televoting custom sms
 */
smsPlusController.getAllCustomMessage = async (req, res) => {
    try {

        // req.body.shortCode = req.body.shortCode.name

        const customMessage = await smsPlusServiceObj.getAllCustomMessage();

        res.status(200).send({
            code: 200,
            message: "Custom message recieved successfully",
            messageData: customMessage ? customMessage : "noMessage",
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to get televoting custom sms from table
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns televoting custom sms
 */
smsPlusController.getCustomMessage = async (req, res) => {
    try {

        req.body.shortCode = req.body.shortCode.name

        const customMessage = await smsPlusServiceObj.checkExisting({
            where: {
                shortCode: req.body.shortCode,
                reply: req.body.reply
            }

        });


        res.status(200).send({
            code: 200,
            message: "Custom message recieved successfully",
            messageData: customMessage ? customMessage : "noMessage",
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to get televoting sms count from table
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns televoting sms count
 */
smsPlusController.getAllCount = async (req, res) => {

    try {

        const service = await serviceServiceObj.getRequiredServices({
            where: {
                name: "Televoting"
            },
        });
        const scurelationData = await serviceServiceObj.getMessageData({
            where: {
                serviceId: service.id,
                status: "Allowed",
                userId: req.userId
            },
            include: [{
                model: db.ShortCode,
                required: true
            }]
        });
        let codes = [];
        for (let relation of scurelationData) {
            codes.push(relation.ShortCode.id);
        }
        const receivedMessage = await smsPlusServiceObj.recievedSms({
            where: {
                shortCodeId: codes,
                type: "Televoting"
            },
        });
        let smsId = [];

        for (let relation of receivedMessage) {
            smsId.push(relation.id);
        }

        const receivedMessageCount = await smsPlusServiceObj.receivedMessageCount({
            where: {
                recievedSmsId: smsId
            },
        });
        const checkKeywordMessageCount = await smsPlusServiceObj.TCheckKeywordMessageCount({
            where: {
                recievedSmsId: smsId
            },
        });
        const balanceDeductionMessageCount = await smsPlusServiceObj.balanceDeductionMessageCount({
            where: {
                recievedSmsId: smsId
            },
        });
        const successfullMessageCount = await smsPlusServiceObj.successfullMessageCount({
            where: {
                recievedSmsId: smsId
            },
        });
        const sentMessageCount = await smsPlusServiceObj.sentMessageCount({
            where: {
                recievedSmsId: smsId
            },
        });
        res.status(200).send({
            code: 200,
            message: "counts received successfully",
            receivedMessageCount: receivedMessageCount ? receivedMessageCount : "Table is empty",
            checkKeywordMessageCount: checkKeywordMessageCount ? checkKeywordMessageCount : "Table is empty",
            balanceDeductionMessageCount: balanceDeductionMessageCount ? balanceDeductionMessageCount : "Table is empty",
            successfullMessageCount: successfullMessageCount ? successfullMessageCount : "Table is empty",
            sentMessageCount: sentMessageCount ? sentMessageCount : "Table is empty",
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to get televoting chart data sms from table
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns televoting chart data sms
 */
smsPlusController.getChartData = async (req, res) => {
    try {
        const service = await serviceServiceObj.getRequiredServices({
            where: {
                name: "Televoting"
            },
        });
        const scurelationData = await serviceServiceObj.getMessageData({
            where: {
                serviceId: service.id,
                status: "Allowed",
                userId: req.userId
            },
            include: [{
                model: db.ShortCode,
                required: true
            }]
        });
        let codes = [];
        for (let relation of scurelationData) {
            codes.push(relation.ShortCode.id);
        }
        const receivedMessage = await smsPlusServiceObj.recievedSms({
            where: {
                shortCodeId: codes,
                type: "Televoting"
            },
        });
        let smsId = [];

        for (let relation of receivedMessage) {
            smsId.push(relation.id);
        }
        dbName = req.body.name;
        const messageData = await smsPlusServiceObj.graphData(dbName, {
            where: {
                recievedSmsId: smsId
            },
        });
        let whereClause = {
            where: {
                recievedSmsId: smsId
            },
            attributes: [
                /* add other attributes you may need from your table */
                [sequelize.fn('MONTH', sequelize.col('createdAt')), 'Data'],
                [sequelize.literal(`COUNT(*)`), 'count']
            ],
            group: ["Data"]
        };
        if (req.body.shortCode) {

            whereClause.where.shortCode = req.body.shortCode;

        }
        if (req.body.dateFilter) {
            if (moment(req.body.dateFilter.endDate).isBefore(req.body.dateFilter.startDate)) {
                return res.status(500).send({
                    message: "end date connot be before start date"
                });

            } else {
                whereClause.where.createdAt = {
                    [Op.lte]: req.body.dateFilter.endDate,
                    [Op.gte]: req.body.dateFilter.startDate
                }
            }

        }
        const messageData2 = await smsPlusServiceObj.graphData2(dbName, whereClause);
        res.status(200).send({
            code: 200,
            message: dbName + "data received successfully",
            data: messageData ? messageData : "Table is empty",
            data2: messageData2 ? messageData2 : "Table is empty",
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to get televoting debit chart sms from table
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns televoting debit chart sms
 */
smsPlusController.getDebitChartData = async (req, res) => {
    try {

        const service = await serviceServiceObj.getRequiredServices({
            where: {
                name: "Televoting"
            },
        });
        const scurelationData = await serviceServiceObj.getMessageData({
            where: {
                serviceId: service.id,
                status: "Allowed",
                userId: req.userId
            },
            include: [{
                model: db.ShortCode,
                required: true
            }]
        });
        let codes = [];
        for (let relation of scurelationData) {
            codes.push(relation.ShortCode.id);
        }
        const receivedMessage = await smsPlusServiceObj.recievedSms({
            where: {
                shortCodeId: codes,
                type: "Televoting"
            },
        });
        let smsId = [];

        for (let relation of receivedMessage) {
            smsId.push(relation.id);
        }
        if (req.body.name == "Debit") {
            dbName = "smsPlusBalanceDeduction";
        }
        const messageData = await smsPlusServiceObj.graphData(dbName, {
            where: {
                recievedSmsId: smsId,
                message: '["Successful"]',
            },
        });
        let whereClause = {
            where: {
                recievedSmsId: smsId,
            },
            include: [{
                model: db.smsPlusBalanceDeduction,
                where: {
                    recievedSmsId: smsId,
                    message: '["Successful"]',
                },
                required: true
            }],
            attributes: [
                /* add other attributes you may need from your table */
                [sequelize.fn('MONTH', sequelize.col('smsPlusCheckKeyword.createdAt')), 'Data'],
                [sequelize.fn('sum', sequelize.col('price')), 'count'],
            ],
            group: ["Data"],

        };
        if (req.body.shortCode) {

            whereClause.where.shortCode = req.body.shortCode;

        }
        if (req.body.service) {

            whereClause.where.serviceName = req.body.service;

        }
        if (req.body.dateFilter) {
            if (moment(req.body.dateFilter.endDate).isBefore(req.body.dateFilter.startDate)) {
                return res.status(500).send({
                    message: "end date connot be before start date"
                });

            } else {
                whereClause.where.createdAt = {
                    [Op.lte]: req.body.dateFilter.endDate,
                    [Op.gte]: req.body.dateFilter.startDate
                }
            }

        }
        dbName = "smsPlusCheckKeyword"
        const messageData2 = await smsPlusServiceObj.graphData2(dbName, whereClause);
        res.status(200).send({
            code: 200,
            message: dbName + "data received successfully",
            data: messageData ? messageData : "Table is empty",
            data2: messageData2 ? messageData2 : "Table is empty",
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to get televoting sms details from table
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns televoting sms details
 */
smsPlusController.getMessageDetail = async (req, res) => {
    try {
        const recievedMessage = await smsPlusServiceObj.RecievedMessages({
            where: {
                recievedSmsId: req.body.id
            }
        });
        const checkKeywordMessage = await smsPlusServiceObj.TCheckKeywordMessages({
            where: {
                recievedSmsId: req.body.id
            }
        });
        const balanceDeductionMessage = await smsPlusServiceObj.BalanceDeductionMessages({
            where: {
                recievedSmsId: req.body.id
            }
        });
        const successfullMessage = await smsPlusServiceObj.SuccessfullMessages({
            where: {
                recievedSmsId: req.body.id
            }
        });
        const sentMessage = await smsPlusServiceObj.SentMessages({
            where: {
                recievedSmsId: req.body.id
            }
        });
        res.status(200).send({
            code: 200,
            message: "Message data received successfully",
            recievedMessage: recievedMessage ? recievedMessage : "Table is empty",
            checkKeywordMessage: checkKeywordMessage ? checkKeywordMessage : "Table is empty",
            balanceDeductionMessage: balanceDeductionMessage ? balanceDeductionMessage : "Table is empty",
            successfullMessage: successfullMessage ? successfullMessage : "Table is empty",
            sentMessage: sentMessage ? sentMessage : "Table is empty",
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to get services allowed to user
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns services allowed
 */
smsPlusController.getMessageServices = async (req, res) => {
    try {
        const service = await serviceServiceObj.getRequiredServices({
            where: {
                name: "Televoting"
            },
        });
        const scurelationData = await serviceServiceObj.getMessageData({
            where: {
                serviceId: service.id,
                status: "Allowed",
                userId: req.userId
            },
            include: [{
                model: db.ShortCode,
                required: true
            }]
        });
        let codes = [];
        for (let relation of scurelationData) {
            codes.push(relation.ShortCode.id);
        }
        const receivedMessage = await smsPlusServiceObj.recievedSms({
            where: {
                shortCodeId: codes,
                type: "Televoting"
            },
        });
        let smsId = [];

        for (let relation of receivedMessage) {
            smsId.push(relation.id);
        }
        const messageData = await smsPlusServiceObj.graphData("smsPlusCheckKeyword", {
            where: {
                recievedSmsId: smsId,
            },
            attributes: ["serviceName"]
        });

        res.status(200).send({
            code: 200,
            message: "data received successfully",
            data: messageData ? messageData : "Table is empty",
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to get televoting error message 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns televoting error message
 */
smsPlusController.getErrorMessages = async (req, res) => {
    try {
        const service = await serviceServiceObj.getRequiredServices({
            where: {
                name: "Televoting"
            },
        });
        const scurelationData = await serviceServiceObj.getMessageData({
            where: {
                serviceId: service.id,
                status: "Allowed",
                userId: req.userId
            },
            include: [{
                model: db.ShortCode,
                required: true
            }]
        });
        let codes = [];
        for (let relation of scurelationData) {
            codes.push(relation.ShortCode.id);
        }
        const receivedMessage = await smsPlusServiceObj.recievedSms({
            where: {
                shortCodeId: codes,
                type: "Televoting"
            },
        });
        let smsId = [];

        for (let relation of receivedMessage) {
            smsId.push(relation.id);
        }
        const messageData = await televotingServiceObj.getErrorMessages({
            where: {
                recievedSmsId: smsId,
            },
            include: [{
                model: db.recievedSms,
                required: true,
                include: [{
                    model: db.ShortCode,
                    required: true
                }]
            }],
            order: [
                ["id", "DESC"]
            ],
        });

        res.status(200).send({
            code: 200,
            message: "data received successfully",
            data: messageData ? messageData : "Table is empty",
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * Documentaion for an Controller Object
 * SmsPlus Controller Object is exported to be used in other files
 * @smsPlusController
 */
module.exports = smsPlusController;