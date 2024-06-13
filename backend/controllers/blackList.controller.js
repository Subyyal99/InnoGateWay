/**
 * BlackList_Controller_Functions module
 * @module BlackList_Controller_Functions
 */
/**
 * All functions for blacklist data are in this file
 */

/**
 * blacklist controller object exports functions in the controller file
 */
const blackListController = {};
/**
 * blacklist service file import
 */
const BlackListService = require("../services/blackList.service.js");
/**
 * blacklist service class object to access blacklist services
 */
const blackListServiceObj = new BlackListService();
/**
 * function to black list user by ip 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
blackListController.byIp = async (req, res) => {
  try {
    /**
     * saving user id 
     */
    req.body.userId = req.userId;
    /**
     * call to function blackListByIp with data to black list ip and insert in database
     */
    const blackListedIp = await blackListServiceObj.blackListByIp(req.body);
    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "Ip BlackListed Successfully",
      data: blackListedIp,
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to get blacklisted ips from database 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
blackListController.getBlackListedIps = async (req, res) => {
  try {
    /**
     * call to function getBlackListedIps to get blacklisted ips
     */
    const blackListedIps = await blackListServiceObj.getBlackListedIps();
    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "BlackListed Ips Successfully Received",
      data: blackListedIps,
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to remove blacklisted ips from database 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
blackListController.removeBlackListedIps = async (req, res) => {
  try {
    /**
     * saving id send via function call
     */
    let id = req.body.id;
    /**
     * call to function deleteBlackListedIps to remove blacklisted ips
     */
    const blackListedIp = await blackListServiceObj.deleteBlackListedIps(id);
    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "BlackListed Ip Successfully Removed",
      data: blackListedIp,
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to get black list msisdn 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
blackListController.byMsisdn = async (req, res) => {
  try {
    req.body.userId = req.userId ? req.userId : 1;
    /**
     * call to function blackListByMsisdn with data to black list msisdn and insert in database
     */
    const blackListedMsisdn = await blackListServiceObj.blackListByMsisdn(
      req.body
    );
    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "Msisdn BlackListed Successfully",
      data: blackListedMsisdn,
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to get blacklisted msisdns from database 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
blackListController.getBlackListedMsisdns = async (req, res) => {
  try {
    /**
     * call to function getBlackListedMsisdns to get blacklisted msisdns
     */
    const blackListedMsisdns =
      await blackListServiceObj.getBlackListedMsisdns();
    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "BlackListed Msisdns Successfully Received",
      data: blackListedMsisdns,
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to remove blacklisted msisdns from database 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
blackListController.removeBlackListedMsisdns = async (req, res) => {
  try {
    /**
     * saving id send via function call
     */
    let id = req.body.id;
    /**
     * call to function deleteBlackListedMsisdns to remove blacklisted msisdns
     */
    const blackListedMsisdns =
      await blackListServiceObj.deleteBlackListedMsisdns(id);
    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "BlackListed Msisdns Successfully Removed",
      data: blackListedMsisdns,
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
 * BlackList Controller Object is exported to be used in other files
 * @blackListController
 */

module.exports = blackListController;