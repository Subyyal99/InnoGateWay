/**
 * Sms_Controller_Functions module
 * @module Sms_Controller_Functions
 */
/**
 * All functions for shortcode data are in this file
 */

/**
 * sms controller object exports functions in the controller file
 */
const smsController = {};
/**
 * Sms Service file import
 */
const SmsService = require("../services/sms.service.js");
/**
 * Sms Service class object
 */
const smsServiceObj = new SmsService();
/**
 * Contact Service file import
 */
const ContactService = require("../services/contact.service.js");
/**
 * Contact Service class object
 */
const contactServiceObj = new ContactService();
/**
 * InBilling Service file import
 */
const InBillingService = require("../services/inBilling.service.js");
/**
 * InBilling Service class object
 */
const inBillingServiceObj = new InBillingService();
/**
 * Platform Service file import
 */
const PlatformService = require("../services/platform.service.js");
/**
 * Platform Service class object
 */
const PlatformServiceObj = new PlatformService();
/**
 * ShortCode Service file import
 */
const ShortCodeService = require("../services/shortCode.service.js");
/**
 * ShortCode Service class object
 */
const ShortCodeServiceObj = new ShortCodeService();
/**
 * Service Service file import
 */
const serviceService = require("../services/service.service.js");
/**
 * Service Service class object
 */
const serviceServiceObj = new serviceService();
/**
 * Error Received Sms Service file import
 */
const ErrorReceivedSmsService = require("../services/errorReceivedSms.service.js");
/**
 * Error Received Sms Service class object
 */
const errorReceivedSmsServiceObj = new ErrorReceivedSmsService();
/**
 * Sms Plus Service file import
 */
const SmsPlusService = require("../services/smsPlus.service.js");
/**
 * Sms Plus Service class object
 */
const smsPlusServiceObj = new SmsPlusService();
/**
 * XML to JavaScript object converter library
 */
const xml2js = require('xml2js');
/**
 * library to write debug messages
 */
const util = require('util');
/**
 * models import
 */
const db = require("../models/index.js");
/**
 * sequelize library
 */
var sequelize = require("sequelize");
/**
 * library to work and manipulate dates
 */
const moment = require("moment");
/**
 * sequelize operator
 */
const {
  Op
} = require("sequelize");
/**
 * function to send merge sms 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
smsController.sendMergeSms = async (req, res) => {
  try {
    /**
     * seperating contat group ids
     */
    const contactGroupIds = req.body.multiSelectTo.map(
      (contactGroup) => contactGroup.id
    );
    /**
     * getting contacts by id 
     */
    var contacts = JSON.parse(
      JSON.stringify(
        await contactServiceObj.getAllContacts({
          where: {
            contactGroupId: contactGroupIds
          },
        })
      )
    );
    req.body.from = req.body.from.name;
    /**
     * for loop on contacts array to send message to each contact
     */
    for (let num of contacts) {
      /**
       * replacing strings with appropriate data
       */
      let msg = req.body.message.replace(/{Given Name}/gi, num.name);
      msg = msg.replace(/{Mobile Number}/gi, num.phoneNumber);
      /**
       * function call to send sms
       */
      const smsGroups = await smsServiceObj.sendSms({
        to: num.phoneNumber,
        from: req.body.from,
        message: msg,
      });
    }
    /**
     * if operation is successful the res variable carries response with successfull status,data and message 
     */
    res.status(200).send({
      code: 200,
      message: "sms added to queue successfully!",
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to send sms
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
smsController.sendSms = async (req, res) => {
  try {
    /**
     * data adjustment
     */
    req.body.shortCodeId = req.body.from.shortCodeId
    req.body.from = req.body.from.name;
    let messageData = req.body
    req.body.userId = req.userId
    /**
     * function call to get package data
     */
    const scuRelationData = await smsServiceObj.getScuRelationData({
      where: {
        userId: req.userId,
        serviceId: req.body.serviceId,
        shortCodeId: req.body.shortCodeId
      }
    });
    /**
     * function call to sort data by expiry of package
     */
    const sortedByExpiryData = smsServiceObj.sortByExpiry(scuRelationData)
    /**
     * function all to sum the number of allowed messages
     */
    const sortedByNoOfMessages = await smsServiceObj.sortByNoOfMessages(sortedByExpiryData)
    /**
     * message sum check
     */
    if (sortedByNoOfMessages) {
      /**
       * Api call to send sms 
       */
      const smsGroups = await smsServiceObj.sendSms(messageData);
      req.body.scuRelationId = sortedByNoOfMessages.id
      /**
       * function call to save sms in data base
       */
      const sms = await smsServiceObj.saveSms(req.body);
    } else {
      /**
       * if operation is successful the res variable carries response with successfull status,data and message 
       */
      return res.status(500).send({
        code: 500,
        message: "you have no Available package!",
      });
    }
    /**
     * if operation is successful the res variable carries response with successfull status,data and message 
     */
    res.status(200).send({
      code: 200,
      message: "sms added to queue successfully!",
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to get single sms from DB
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
smsController.getSingleSMS = async (req, res) => {
  try {
    req.body.userId = req.userId
    /**
     * function call to get necessary service data
     */
    const service = await serviceServiceObj.getRequiredServices({
      /**
       * name of the service 
       */
      where: {
        name: "Single Sms"
      },
      /**
       * attribute to get
       */
      attributes: ['id']
    });
    /**
     * service check
     */
    if (service) {
      /**
       * check true
       */
      /**
       * function call to get sms 
       */
      const sms = await smsServiceObj.getSms({
        /**
         * specification of data i.e service  id and user id
         */
        where: {
          serviceId: service.dataValues.id,
          userId: req.userId
        },
        /**
         * data associated 
         */
        include: [{
          model: db.ShortCode,
          required: true
        }],
        /**
         * order of the data decending order by id
         */
        order: [
          ["id", "DESC"]
        ],
      });
      /**
       * if operation is successful the res variable carries response with successfull status,data and message 
       */
      res.status(200).send({
        code: 200,
        message: "sms added to queue successfully!",
        data: sms
      });
    } else {
      /**
       * if operation is successful the res variable carries response with successfull status,data and message 
       */
      res.status(200).send({
        code: 200,
        message: "service not found!",
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
 * function to get Bulk sms from DB
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
smsController.getBulkSMS = async (req, res) => {
  try {
    req.body.userId = req.userId
    /**
     * function call to get necessary service data
     */
    const service = await serviceServiceObj.getRequiredServices({
      /**
       * name of the service 
       */
      where: {
        name: "Bulk Sms"
      },
      /**
       * attribute to get
       */
      attributes: ['id']
    });
    /**
     * service check
     */
    if (service) {
      /**
       * check true
       */
      /**
       * function call to get sms 
       */
      const sms = await smsServiceObj.getSms({
        /**
         * specification of data i.e service  id and user id
         */
        where: {
          serviceId: service.dataValues.id,
          userId: req.userId
        },
        /**
         * data associated 
         */
        include: [{
          model: db.ShortCode,
          required: true
        }],
        /**
         * order of the data decending order by id
         */
        order: [
          ["id", "DESC"]
        ],
      });
      /**
       * if operation is successful the res variable carries response with successfull status,data and message 
       */
      res.status(200).send({
        code: 200,
        message: "sms added to queue successfully!",
        data: sms
      });
    } else {
      /**
       * if operation is successful the res variable carries response with successfull status,data and message 
       */
      res.status(200).send({
        code: 200,
        message: "service not found!",
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
 * function to send sms by Api call
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
smsController.sendSmsByApi = async (req, res) => {
  try {
    /**
     * function to call API to send sms
     */
    const smsGroups = await smsServiceObj.sendSms(req.body);
    /**
     * if operation is successful the res variable carries response with successfull status,data and message 
     */
    res.status(200).send({
      code: 200,
      message: "sms added to queue successfully!",
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to sms count
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
smsController.getSmsCount = async (req, res) => {
  try {
    /**
     * function call to get package data 
     */
    const scuRelationData = await smsServiceObj.getScuRelationData({
      /**
       * pacakge specifications
       */
      where: {
        userId: req.userId,
        serviceId: req.body.serviceId,
        shortCodeId: req.body.shortCodeId,
        status: "Allowed"
      }
    });
    /**
     * sort data by expiry date of packages
     */
    const sortedByExpiryData = smsServiceObj.sortByExpiry(scuRelationData)
    /**
     * sort by sum of number of allowed messages
     */
    const sortedByNoOfMessages = await smsServiceObj.sortByNoOfMessages(sortedByExpiryData)
    /**
     * message sum check
     */
    if (sortedByNoOfMessages) {
      /**
       * function to get number of messages send
       */
      const smsCount = await smsServiceObj.getSmsCount({
        where: {
          userId: req.userId,
          serviceId: req.body.serviceId,
          shortCodeId: req.body.shortCodeId,
        }
      })
      /**
       * if operation is successful the res variable carries response with successfull status,data and message 
       */
      res.status(200).send({
        code: 200,
        message: "message count",
        allowedMessages: sortedByNoOfMessages ? sortedByNoOfMessages : 0,
        sentMessages: smsCount
      });
    } else {
      //  const smsCount = await smsServiceObj.getSmsCount({
      //    where: {
      //      userId: req.userId,
      //      serviceId: req.body.serviceId,
      //      shortCodeId: req.body.shortCodeId,
      //      scurelationId: sortedByNoOfMessages.id
      //    }
      //  })

      /**
       * if operation is successful the res variable carries response with successfull status,data and message 
       */
      res.status(200).send({
        code: 200,
        message: "no packages available",
        allowedMessages: sortedByNoOfMessages ? sortedByNoOfMessages.numberOfMessageAllowed : 0,
        //  sentMessages: smsCount
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
 * function to Bulk Sms
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
smsController.sendBulkSms = async (req, res) => {
  try {
    let shortCodeId = req.body.from.shortCodeId

    /**
     * function call to get package data 
     */
    const scuRelationData = await smsServiceObj.getScuRelationData({
      /**
       * pacakge specifications
       */
      where: {
        userId: req.userId,
        serviceId: req.body.serviceId,
        shortCodeId: shortCodeId
      }
    });
    /**
     * sort data by expiry date of packages
     */
    const sortedByExpiryData = smsServiceObj.sortByExpiry(scuRelationData)
    /**
     * sort by sum of number of allowed messages
     */
    const sortedByNoOfMessages = await smsServiceObj.sortByNoOfMessages(sortedByExpiryData)
    /**
     * message sum check
     */
    if (sortedByNoOfMessages) {
      /**
       * copy of contact array to send sms to
       */
      req.body.To = [req.body.To];
      /** contact check */
      if (req.body.multiSelectTo) {
        /**
         * getting contact ids from contact data
         */
        const contactGroupIds = req.body.multiSelectTo.map(
          (contactGroup) => contactGroup.id
        );
        /**
         * function all to get all contacts
         */
        var contacts = JSON.parse(
          JSON.stringify(
            await contactServiceObj.getAllContacts({
              where: {
                contactGroupId: contactGroupIds
              },
            })
          )
        );
        /** contact check */
        if (contacts) {
          /**
           * if true gett all phoneNumbers and saved in array to send sms to
           */
          contacts = contacts.map((contact) => contact.phoneNumber);
          req.body.to = [...req.body.to, ...contacts];
        }
      }
      /**
       * sms receivers number check
       */
      if (req.body.to.length > 0) {
        let counter = 0
        /**
         * loop to get sent sms by same shortcode and service by same user
         */
        for (let num of req.body.to) {
          const smsCount = await smsServiceObj.getSmsCount({
            where: {
              userId: req.userId,
              serviceId: req.body.serviceId,
              shortCodeId: shortCodeId,
            }
          })
          if (sortedByNoOfMessages) {
            /**
             * API call to send sms
             */
            const smsGroups = await smsServiceObj.sendSms({
              to: num,
              from: req.body.from.name,
              message: req.body.message,
            });
            /**
             * function call to save sms in DB
             */
            const sms = await smsServiceObj.saveSms({
              to: num,
              from: req.body.from.name,
              message: req.body.message,
              userId: req.userId,
              serviceId: req.body.serviceId,
              shortCodeId: shortCodeId,
            });
            counter++
          } else {
            /**
             * if operation is successful the res variable carries response with successfull status,data and message 
             */
            return res.status(500).send({
              code: 500,
              message: "number of messages sent exceeds the allowed limit! " + counter + " out of " + req.body.to.length + " messages sent successfully!",
            });
          }
        }
      } else {
        /**
         * if operation is successful the res variable carries response with successfull status,data and message 
         */
        return res.status(500).send({
          code: 500,
          message: "no contacts available!",
        });
      }
      /**
       * if operation is successful the res variable carries response with successfull status,data and message 
       */
      res.status(200).send({
        code: 200,
        message: "sms added to queue successfully!",
      });
    } else {
      /**
       * if operation is successful the res variable carries response with successfull status,data and message 
       */
      return res.status(500).send({
        code: 500,
        message: "you have no Available package!",
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
 * function to receive sms
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
smsController.receiveSms = async (req, res) => {
  var step = "Check Keyword";
  var receivedSmsId;
  try {
    /**
     * function call to get shortCode 
     */
    const shortCode = await ShortCodeServiceObj.getOneShortCodes({
      where: {
        shortCode: req.query.shortCode
      }
    });
    /**
     * setting req data with msisdn from received sms and shortcode
     */
    let data = {
      msisdn: req.query.msisdn,
      shortCodeId: shortCode.id
    };
    /**
     * function call to save the received sms in Database
     */
    const receivedSms = JSON.parse(
      JSON.stringify(await smsServiceObj.saveReceivedSms(data))
    );
    /**
     * receive sms id
     */
    receivedSmsId = receivedSms.id;
    /** 
     * adjusting sms data to save in table
     */
    data = {
      msisdn: req.query.msisdn,
      message: req.query.text,
      shortCode: req.query.shortCode,
      recievedSmsId: receivedSms.id,
    };
    /**
     * function call to save receive sms in Database
     */
    await smsServiceObj.saveReceivedSmsContent(data);
    /** 
     * adjusting sms data to save in table
     */
    data = {
      msisdn: req.query.msisdn,
      uniqueKey: receivedSms.id,
      keyword: req.query.text,
      // channel: "NEZAM"
      channel: req.query.shortCode == '2728' ? "NEZAM" : "BJMTN",
    };
    /**
     * function call to save receive sms in Database
     */
    const serviceDetails = await PlatformServiceObj.getService(data);
    /**
     * service details check
     */
    if (
      serviceDetails &&
      serviceDetails.data &&
      serviceDetails.Status == "success"
    ) {
      /** 
       * adjusting sms data to save in table
       */
      data = {
        type: serviceDetails.data.Type == 'subscription_plan' ? 'SmsPlus' : 'Televoting'
      };
      /**
       * function call to update receive sms in Database by id
       */
      await smsServiceObj.updateReceivedSms(data, {
        where: {
          id: receivedSms.id
        }
      });
      /**
       * billing portion
       */
      var billingCode, price;
      if (serviceDetails.data.Type == 'subscription_plan') {
        /**
         * data required for billing
         */
        data = {
          serviceName: serviceDetails.data.Service_name,
          keyword: serviceDetails.data.Keyword,
          code: serviceDetails.data.Billing_code,
          shortCode: req.query.shortCode,
          promoCode: serviceDetails.data.Promo_code,
          price: serviceDetails.data.Price,
          currency: serviceDetails.data.Currency,
          expiryDate: serviceDetails.data.Expiry_date,
          countryoperator: serviceDetails.data["Country/operator"],
          msisdn: req.query.msisdn,
          recievedSmsId: receivedSms.id,
        };
        /**
         * save sms plus service
         */
        await smsServiceObj.saveSmsPlusService(data);
        /**
         * billing code
         */
        billingCode = serviceDetails.data.Billing_code;
        /**
         * price for billing
         */
        price = serviceDetails.data.Price;
        serviceName = serviceDetails.data.Service_name;
      } else {
        /**
         * data required for billing
         */
        data = {
          keyword: serviceDetails.data.keyword,
          serviceName: serviceDetails.data.service_name,
          shortCode: req.query.shortCode,
          price: serviceDetails.data.price,
          currency: serviceDetails.data.currency,
          countryoperator: serviceDetails.data.country_operators,
          msisdn: req.query.msisdn,
          channel: serviceDetails.data.channel,
          recievedSmsId: receivedSms.id,
        }
        /**
         * save televoting service
         */
        await smsServiceObj.saveTeleVotingService(data);
        /**
         * billing code
         */
        billingCode = serviceDetails.data.billing_code;
        /**
         * price for billing
         */
        price = serviceDetails.data.price;
        serviceName = serviceDetails.data.service_name;
      }
      /**
       * billing steps process starts here
       */
      step = "Billing";
      /**
       * reply for billing
       */
      var repl = "";
      /**
       * billing error flag
       */
      let billingErrorFlag = false;
      /**
       * billing error message
       */
      let billingErrorMessage = "";
      /**
       * short code check
       */
      if (req.query.shortCode == '2728') {
        /**
         * data object required for billing
         */
        data = {
          msisdn: req.query.msisdn,
          billingCode: billingCode,
          requestId: receivedSms.id,
        };
        /**
         * function call to deduct balance for inbilling
         */
        const inBillingReply = await inBillingServiceObj.deductBalance(data);
        /**
         * xml parser
         */
        const parser = new xml2js.Parser();
        /**
         * saving data after parsing it because data returned by function call is not in readable form
         */
        const result = await util.promisify(parser.parseString.bind(parser))(inBillingReply.response.body);
        /**
         * saving data after parsing it because data returned by function call is not in readable form
         */
        const result1 = await util.promisify(parser.parseString.bind(parser))(result['soapenv:Envelope']['soapenv:Body'][0]['doServiceResponse'][0]['doServiceReturn'][0]);

        /**
         * repl string
         */
        repl = JSON.stringify(result1.zsmart.Data[0].header[0].returnMsg);
        /**
         * error message check
         */
        if ((repl.includes('errorCode'))) {
          /**
           * if error check is true then error flag is true and error message is generated
           */
          billingErrorFlag = true;
          billingErrorMessage = result1.zsmart.Data[0].header[0].returnMsg[0].split('errorDesc = ')[1].replace('[', '').replace(']', '');
        }
      } else {
        /**
         * if error check is false then then price is deducted
         */
        data = {
          msisdn: req.query.msisdn,
          amount: price * 100,
          requestId: receivedSms.id,
        };
        const inBillingReply = await inBillingServiceObj.deductBalanceFrom2ndOperator(data);
        /**
         * xml parser
         */
        const parser = new xml2js.Parser();
        /**
         * saving data after parsing it because data returned by function call is not in readable form
         */
        const result = await util.promisify(parser.parseString.bind(parser))(inBillingReply.response.body);
        /**
         * code of the response recieved after billings
         */
        let responseCode = result.methodResponse.params[0].param[0].value[0].struct[0].member.find(item => item.name == 'responseCode').value[0].i4[0];
        /**
         * response code check
         */
        if (responseCode != "0") {
          /**
           * if true then error flag is true and we check the case of the error and send error accordingly
           */
          billingErrorFlag = true;
          switch (responseCode) {
            case "102":
              billingErrorMessage = "Number is not correct";
              break;
            case "124":
              billingErrorMessage = "Vous ne disposez pas de crédit suffisant pour souscrire au service " + service_name;
              break;
            default:
              billingErrorMessage = "There is some issue in the request";
          }
        }
        /**
         * if check is not true  then error flag is true and reply message is successfull
         */
        repl = "Successful";
      }
      /**
       * formatting data for entry in database table
       */
      data = {
        shortCode: req.query.shortCode,
        msisdn: req.query.msisdn,
        message: repl,
        recievedSmsId: receivedSms.id,
      };
      var replyMessage, msg;
      /**
       * billing error flag check
       */
      if (!billingErrorFlag) {
        /**
         * if error flag is false then final billing data is adjusted
         */
        let billingData = {
          shortCode: req.query.shortCode,
          keyword: req.query.text,
          channel: req.query.shortCode == '2728' ? "NEZAM" : "BJMTN",
          price: price,
          voucher: serviceDetails.data.Promo_code,
          transactionId: receivedSms.id
        };
        /**
         * function to save save billing status
         */
        const saveBillingStatus = await PlatformServiceObj.saveDebitStatus(billingData);
        step = "Reply Message";
        /**
         * function to save sms plus deeduction entry
         */
        await smsServiceObj.saveSmsPlusDeduction(data);
        /**
         * service deatils check
         */
        if (serviceDetails.data.Type == 'subscription_plan') {
          data = {
            msisdn: req.query.msisdn,
            uniqueKey: receivedSms.id,
            keyword: req.query.text,
          };
          /**
           * get reply message
           */
          replyMessage = await PlatformServiceObj.getReplyMessage(data);
          msg = replyMessage.data.Reply_msg;
        } else {
          data = {
            service_name: serviceDetails.data.service_name,
            answer: serviceDetails.data.keyword,
            msisdn: req.query.msisdn,
            keyword: serviceDetails.data.keyword,
            channel: serviceDetails.data.channel
          }
          /**
           * get reply message
           */
          replyMessage = await PlatformServiceObj.getReplyMessageTelevoting(data);
          msg = replyMessage.data;
        }
        /**
         * message is successfull 
         */
        if (replyMessage && replyMessage.data && replyMessage.Status == "success") {
          data = {
            shortCode: req.query.shortCode,
            msisdn: req.query.msisdn,
            message: msg,
            uniqueKey: receivedSms.id,
            recievedSmsId: receivedSms.id,
          };
          /**
           * save sms plus sent mesage
           */
          await smsServiceObj.saveSmsPlusSentMessage(data);

          /**
           * encoder for message
           */
          let encoded = Buffer.from(msg, 'utf-8')

          /**
           * APi call to send sms
           */
          await smsServiceObj.sendSms({
            to: req.query.msisdn,
            from: req.query.shortCode,
            message: encoded,
          });
          /**
           * save entry in sms plus successfull table
           */
          await smsServiceObj.saveSmsPlusSuccessfullMessage(data);
        } else {
          data = {
            shortCode: req.query.shortCode,
            msisdn: req.query.msisdn,
            message: replyMessage.error,
            step: step,
            recievedSmsId: receivedSmsId,
          };
          /**
           * message is not successfull
           */
          /**
           * function call to add error message
           */
          await errorReceivedSmsServiceObj.addError(data);
          /**
           * API call to send error sms
           */
          await smsServiceObj.sendSms({
            to: req.query.msisdn,
            from: req.query.shortCode,
            message: replyMessage.error,
          });
        }
      } else {
        data = {
          shortCode: req.query.shortCode,
          msisdn: req.query.msisdn,
          message: billingErrorMessage,
          step: step,
          recievedSmsId: receivedSms.id,
        };
        /**
         * add error message
         */
        await errorReceivedSmsServiceObj.addError(data);
        /**
         * API call to send error sms
         */
        await smsServiceObj.sendSms({
          to: req.query.msisdn,
          from: req.query.shortCode,
          message: billingErrorMessage,
        });
      }
    } else {
      /**
       * data adjustment
       */
      data = {
        shortCode: req.query.shortCode,
        msisdn: req.query.msisdn,
        message: serviceDetails.error,
        step: "Check Keyword",
        recievedSmsId: receivedSms.id,
      };
      /**
       * add error message
       */
      await errorReceivedSmsServiceObj.addError(data);
      /**
       * API call to send error sms
       */
      await smsServiceObj.sendSms({
        to: req.query.msisdn,
        from: req.query.shortCode,
        message: serviceDetails.error,
      });
    }
  } catch (error) {
    /**
     * custom error message variable msg with different message checks
     */
    let msg = error.error && error.error.error ? error.error.error : 'Connection Problem with the server'
    data = {
      shortCode: req.query.shortCode,
      msisdn: req.query.msisdn,
      message: msg,
      step: step,
      recievedSmsId: receivedSmsId,
    };
    /**
     * add error message
     */
    await errorReceivedSmsServiceObj.addError(data);
    /**
     * API call to send error sms
     */
    await smsServiceObj.sendSms({
      to: req.query.msisdn,
      from: req.query.shortCode,
      message: msg,
    });
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to send campaign sms
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
smsController.sendCampaign = async (req, res) => {
  try {
    /**
     * function to get service data 
     */
    const service = await serviceServiceObj.getRequiredServices({
      /**
       * name of the service to get
       */
      where: {
        name: "Campaigns"
      },
      /**
       * attribute of the service
       */
      attributes: ['id']
    });
    /**
     * get specific campaign by id
     */
    const campaignData = await smsServiceObj.getCampaign({
      where: {
        id: req.body.id
      },
      /**
       * campaign contacts associated data included
       */
      include: [{
        model: db.selectedContactCampaigns,
        require: true,
        where: {
          smsCampaignId: req.body.id
        },

      }]
    })
    /**
     * campaign send type check 
     */
    if (campaignData && campaignData.dataValues.sendType == "Send It Now") {
      let contactGroupIds = []
      /**
       * for loop to get contact ids from contact groups
       */
      for (let relation of campaignData.selectedContactCampaigns) {
        contactGroupIds.push(relation.dataValues.contactGroupId);
      }
      /**
       * function call to get all contact by contact ids
       */
      const contactData = await smsServiceObj.getAllContacts({
        where: {
          contactGroupId: contactGroupIds
        }
      });
      /**
       * function call to send campiang sms
       */
      await smsServiceObj.sendCampaignSms(campaignData.dataValues, contactData, service.dataValues.id);
    }
    // if (campaignData && campaignData.dataValues.sendType == "Schedule For Later") {
    //   let contactGroupIds = []
    //   for (let relation of campaignData.selectedContactCampaigns) {
    //     contactGroupIds.push(relation.dataValues.contactGroupId);
    //   }
    //   const contactData = await smsServiceObj.getAllContacts({
    //     where: {
    //       contactGroupId: contactGroupIds
    //     }
    //   });
    //   await smsServiceObj.sendCampaignSms(campaignData.dataValues, contactData);
    // }
    // if (campaignData && campaignData.dataValues.sendType == "Stagger My Campaign") {
    //   let contactGroupIds = []
    //   for (let relation of campaignData.selectedContactCampaigns) {
    //     contactGroupIds.push(relation.dataValues.contactGroupId);
    //   }
    //   const contactData = await smsServiceObj.getAllContacts({
    //     where: {
    //       contactGroupId: contactGroupIds
    //     }
    //   });
    //   await smsServiceObj.sendCampaignSms(campaignData.dataValues, contactData);
    // }
    /**
     * if operation is successful the res variable carries response with successfull status,data and message 
     */
    res.status(200).send({
      code: 200,
      message: "Campaign sent successfully!",
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to save campaign
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns data campaigns
 */
smsController.saveCampaign = async (req, res) => {
  try {
    /**
     * campaign id check
     */
    if (req.body.id) {
      /**
       * campaign from check to adjust required data
       */
      if (req.body.from) {
        req.body.shortCodeId = req.body.from.id;
        req.body.from = req.body.from.name;
      }
      req.body.userId = req.userId
      /**
       * campaign send type check adjust required data
       */
      if (req.body.sendType == "Stagger my campaign") {
        req.body.dontSendBefore = req.body.dontSendBefore.name.split(" ")
        const startTime = req.body.dontSendBefore[0] + req.body.dontSendBefore[1];
        const time = req.body.dontSendAfter.name.split(" ");
        const endTime = time[0] + time[1];
        req.body.startScheduleDate = req.body.startScheduleDate.split('T')
        req.body.endScheduleDate = req.body.endScheduleDate.split('T')
        req.body.startScheduleDate = req.body.startScheduleDate[0] + "T" + convertTo24HrsFormat(startTime) + ":00.000Z"
        req.body.endScheduleDate = req.body.endScheduleDate[0] + "T" + convertTo24HrsFormat(endTime) + ":00.000Z"
      }
      /**
       * dunction call to create campaign 
       */
      await smsServiceObj.createCampaign(req.body);
      req.body.camppaignId = req.body.id
      /**
       * function call to get campaign by id
       */
      const campaignData = await smsServiceObj.getCampaign({
        where: {
          id: req.body.id
        }
      });
      /**
       * contact data check 
       */
      if (req.body.to) {
        /**
         * for loop to get specific contact list info 
         */
        for (let contactGroup of req.body.to) {
          req.body.contactGroupId = contactGroup.id
          req.body.smsCampaignId = campaignData.id
          const specificContactGroup = await smsServiceObj.getSpecificContactList({
            where: {
              contactGroupId: contactGroup.id,
              smsCampaignId: campaignData.id
            }
          });
          /**
           * function call to save or updae campaign contacts
           */
          await smsServiceObj.selectedContactCampaign(req.body);
        }
      }
      /**
       * if operation is successful the res variable carries response with successfull status,data and message 
       */
      res.status(200).send({
        code: 200,
        message: "Campaign data saved successfully!",
        data: campaignData
      });
    } else {
      /**
       * if campaign id is not present and the campaign is new
       */
      req.body.from = req.body.from.name;
      req.body.shortCodeId = req.body.from.id;
      req.body.userId = req.userId;
      /**
       * function call to create camapaign
       */
      await smsServiceObj.createCampaign(req.body);
      /**
       * function call to get campaign by campaign name
       */
      const campaignData = await smsServiceObj.getCampaign({
        where: {
          campaignName: req.body.campaignName
        }
      })
      /**
       * for loop to save campaign contacts
       */
      for (let contactGroup of req.body.to) {
        req.body.contactGroupId = contactGroup.id
        req.body.smsCampaignId = campaignData.id
        /**
         * function call to save campaign contacts
         */
        await smsServiceObj.selectedContactCampaign(req.body);
      }
      /**
       * if operation is successful the res variable carries response with successfull status,data and message 
       */
      res.status(200).send({
        code: 200,
        message: "Campaign created successfully!",
        data: campaignData
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
 * function to get campaign graph data
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns data campaigns
 */
smsController.getCampaignGraphData = async (req, res) => {
  try {
    /**
     * function call to get service by name
     */
    const service = await serviceServiceObj.getRequiredServices({
      where: {
        name: "Campaigns"
      },
    });
    /** 
     * function call to get package data
     */
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
    /**
     * for loop to get shortcode ids
     */
    for (let relation of scurelationData) {
      codes.push(relation.ShortCode.id);
    }

    dbName = req.body.name;
    /**
     * where clause to get count of messages and group them by date
     */
    let whereClause = {
      where: {},
      attributes: [
        /* add other attributes you may need from your table */
        [sequelize.fn('DATE', sequelize.col('createdAt')), 'Data'],
        [sequelize.literal(`COUNT(*)`), 'count']
      ],
      group: ["Data"]
    };
    /**
     * campaign id check
     */
    if (req.body.campaignId) {

      whereClause.where.campaignId = req.body.campaignId;

    }
    /**
     * date filter check
     */
    if (req.body.dateFilter) {
      /**
       * check to determine if end date is before start date
       */
      if (moment(req.body.dateFilter.endDate).isBefore(req.body.dateFilter.startDate)) {
        /**
         * true then return error 
         */
        return res.status(500).send({
          message: "end date connot be before start date"
        });

      } else {
        /**
         * providing date ranges to where clause
         */
        whereClause.where.createdAt = {
          [Op.lte]: req.body.dateFilter.endDate,
          [Op.gte]: req.body.dateFilter.startDate
        }
      }

    }
    /**
     * function call to get graph data by dbName and whereCaluse
     */
    const messageData2 = await smsPlusServiceObj.graphData2(dbName, whereClause);
    /**
     * if operation is successful the res variable carries response with successfull status,data and message 
     */
    res.status(200).send({
      code: 200,
      message: dbName + "data received successfully",
      data2: messageData2 ? messageData2 : "Table is empty",
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to get campaign data
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns data
 */
smsController.getCampaigns = async (req, res) => {
  try {
    /**
     * function call to get all campaigns made by a specific user
     */
    const campaigns = await smsServiceObj.getAllCampaign({
      where: {
        userId: req.userId
      }
    })
    /**
     * if operation is successful the res variable carries response with successfull status,data and message 
     */
    res.status(200).send({
      code: 200,
      message: "Campaign data retrieved successfully!",
      data: campaigns
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to convert time from 12 hour format to 24 hour format
 * @param {string} time time to convert
 * @returns data 
 */
function convertTo24HrsFormat(time) {
  /**
   * slice time strign
   */
  const slicedTime = time.split(/(PM|AM)/gm)[0];
  /**
   * getting hours and minutes
   */
  let [hours, minutes] = slicedTime.split(':');
  /**
   * hour check
   */
  if (hours === '12') {
    hours = '00';
  }

  let updateHourAndMin;
  /**
   * function to add hours and minutes
   * @param {string} hoursOrMin 
   * @returns data 
   */
  function addition(hoursOrMin) {
    updateHourAndMin =
      hoursOrMin.length < 2 ?
      (hoursOrMin = `${0}${hoursOrMin}`) :
      hoursOrMin;

    return updateHourAndMin;
  }
  /**
   * AM/Pm check
   */
  if (time.endsWith('PM')) {
    hours = parseInt(hours, 10) + 12;
  }

  return `${addition(hours)}:${addition(minutes)}`;
}
/**
 * function to get campaigns
 *  @param req - contains all data requiredfor request
 *  @param res - response returned by the funtion 
 *  @returns data
 */
smsController.getCampaign = async (req, res) => {
  try {
    /**
     * function call to get campaign by id
     */
    const campaignData = await smsServiceObj.getCampaign({
      where: {
        id: req.body.id
      }
    });
    /**
     * function call to get contact list
     */
    const contactListData = await smsServiceObj.getContactList({
      where: {
        smsCampaignId: campaignData.dataValues.id
      },
      include: [{
        model: db.contactGroups,
        require: true
      }]
    })
    /**
     * if operation is successful the res variable carries response with successfull status,data and message 
     */
    res.status(200).send({
      code: 200,
      message: "Campaign data retreived successfully!",
      data: campaignData,
      contactList: contactListData
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to get campaign report
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns data
 */
smsController.getCampaignReport = async (req, res) => {
  try {
    /**
     * function call to get campaign by id
     */
    const campaignData = await smsServiceObj.getCampaign({
      where: {
        id: req.body.id
      }
    });
    /**
     * function acll to get service by name and attribute id
     */
    const service = await serviceServiceObj.getRequiredServices({
      where: {
        name: "Campaigns"
      },
      attributes: ['id']
    });
    // const contactListData = await smsServiceObj.getContactList({
    //   where: {
    //     smsCampaignId: campaignData.dataValues.id
    //   },
    //   include: [{
    //     model: db.contactGroups,
    //     require: true
    //   }]
    // })
    /**
     * if operation is successful the res variable carries response with successfull status,data and message 
     */
    res.status(200).send({
      code: 200,
      message: "Campaign report data!",
      data: campaignData,
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to message counts
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns data
 */
smsController.getMessageCounts = async (req, res) => {
  try {
    let data = []
    /**
     * function call to get services
     */
    const services = await serviceServiceObj.getServices();
    /**
     * for loop to manipulate services data
     */
    for (let service of services) {
      /**
       * service name check to eliminate smsPlus and televoting
       */
      if (service.dataValues.name != "SMS Plus" && service.dataValues.name != "Televoting") {
        /**
         * function call to get packages 
         */
        const scuRelationData = await smsServiceObj.getScuRelationData({
          where: {
            userId: req.userId,
            serviceId: service.dataValues.id,
          }
        });
        /**
         * function call to sort messages by expiry date 
         */
        const sortedByExpiryData = smsServiceObj.sortByExpiry(scuRelationData)
        /**
         * function all to sum the number of allowed messages
         */
        const sortedByNoOfMessages = await smsServiceObj.sortByNoOfMessages(sortedByExpiryData)
        /**
         * service name without spaces
         */
        let name = service.dataValues.name.replace(/ /g, "")
        name = name.charAt(0).toLowerCase() + name.slice(1)
        let obj = {
          name: name,
          value: sortedByNoOfMessages ? sortedByNoOfMessages : 0,
          type: "available"
        }
        data.push(obj)
        if (sortedByNoOfMessages) {
          /**
           * function call to get sms count
           */
          const smsCount = await smsServiceObj.getSmsCount({
            where: {
              userId: req.userId,
              serviceId: service.dataValues.id,
            }
          })
          let obj = {
            name: name,
            value: smsCount ? smsCount : 0,
            type: "sent"
          }
          data.push(obj)
        }
      }
    }
    /**
     * if operation is successful the res variable carries response with successfull status,data and message 
     */
    res.status(200).send({
      code: 200,
      message: "services message count!",
      data: data,
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
 * Sms Controller Object is exported to be used in other files
 * @smsController
 */
module.exports = smsController;