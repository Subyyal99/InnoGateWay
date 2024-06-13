/**
 * Smsc_Controller_Functions module
 * @module Smsc_Controller_Functions
 */
/**
 * All functions for shortcode data are in this file
 */

/**
 * smsc controller object exports functions in the controller file
 */
const smscController = {};
/**
 * Smsc Service file import
 */
const SmscService = require("../services/smsc.service.js");
/**
 * Smsc Service class object
 */
const smscServiceObj = new SmscService();
/**
 * models import
 */
const db = require("../models/index.js");
/**
 * function to get all Smsc 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns all Smsc 
 */
smscController.getAllSmsc = async (req, res) => {
    try {
        const smscs = await smscServiceObj.getAllSmsc();

        res.status(200).send({
            code: 200,
            message: "Smsc Data",
            data: smscs
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to add Smsc 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns  Smsc 
 */
smscController.addAdminSmscs = async (req, res) => {
    try {

        for (let relation of req.body.smsc) {
            const checkSmsc = await smscServiceObj.checkAdminSmsc({
                where: {
                    smscId: relation.id,
                    userId: req.body.userId
                }
            });
            if (checkSmsc) {
                let obj = {
                    status: "Allowed",
                    id: checkSmsc.id,
                }
                const smscs = await smscServiceObj.AdminSmsc(obj);
            } else {
                let obj = {
                    status: "Allowed",
                    smscId: relation.id,
                    userId: req.body.userId
                }
                const smscs = await smscServiceObj.AdminSmsc(obj);
            }

        }


        res.status(200).send({
            code: 200,
            message: "Smsc Registered Successfully",
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to get admin Smscs by id
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns admin Smsc 
 */
smscController.getAdminSmscs = async (req, res) => {
    try {

        const adminSmscs = await smscServiceObj.getAdminSmscs({
            where: {
                userId: req.body.id,
            },
            include: [{
                model: db.Smsc,
                required: true
            }]
        });


        res.status(200).send({
            code: 200,
            message: "Admin Smscs Retrieved Successfully",
            data: adminSmscs
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to update admin Smsc 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns Smsc updated 
 */
smscController.updateAdminSmsc = async (req, res) => {
    try {
        const adminSmscs = await smscServiceObj.AdminSmsc(req.body);
        res.status(200).send({
            code: 200,
            message: "Admin Smsc Updated Successfully",
            data: adminSmscs
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * function to add Smsc
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns Smsc 
 */
smscController.addSmsc = async (req, res) => {
    try {
        const smscs = await smscServiceObj.addSmsc(req.body);

        res.status(200).send({
            code: 200,
            message: "Smsc added successfully",
            data: smscs
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * Documentaion for an Controller Object
 * Smsc Controller Object is exported to be used in other files
 * @smscController
 */
module.exports = smscController;