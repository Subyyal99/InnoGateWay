/**
 * constant database (db) variable to access models 
 */
const db = require("../models/index.js");
/**
 * library used to communicate between servers
 */
const axios = require("axios");
/**
 * moment library to manipulate dates
 */
const moment = require('moment');
/**
 * Class to create a sms service object
 */
class SmsService {
  constructor() {}
  /**
   * function to call Api to send sms
   * @param data data required to send sms
   * @returns data
   */
  async sendSms(data) {
    const smsc = data.from == '2728' ? 'SMS2728' : 'SMS7000';
    const url =
      "http://217.160.56.112:13013/cgi-bin/sendsms?username=SCsmser&password=r4e3w2q1&charset=UTF-8&coding=2&to=+" +
      data.to.replace("+", "") +
      "&text=" +
      encodeURIComponent(data.message) +
      "&from=" +
      data.from +
      "&smsc=SMS" + data.from;
    return await axios.get(url);
  }
  /**
   * function to save sms in database
   * @param data data required to create sms entry in db
   * @returns data
   */
  async saveSms(data) {
    return await db.sms.create(data);
  }
  /**
   * function to find all sms
   * @param whereClause whereCaluse to specify query
   * @returns data
   */
  async getSms(whereClause) {
    return await db.sms.findAll(whereClause);
  }
  /**
   * function to get sms count
   * @param whereClause whereCaluse to specify query
   * @returns data
   */
  async getSmsCount(whereClause) {
    return await db.sms.count(whereClause);
  }
  /**
   * function to get packages
   * @param whereClause whereCaluse to specify query
   * @returns data
   */
  async getScuRelationData(whereClause) {
    return await db.ScuRelation.findAll(whereClause);
  }
  /**
   * function to sort messages by expiry
   * @param  data message data to sort
   * @returns data
   */
  sortByExpiry(data) {
    /**
     * date 
     */
    let date = new Date()
    /**
     * limited packages array
     */
    let limited = []
    /**
     * unlimited packages array
     */
    let unlimited = []
    /**
     * sroted data array
     */
    let sortedData = []
    /**
     * for loop to sort data
     */
    for (let relation of data) {
      /**
       * get expire after
       */
      let expireAfter = JSON.parse(relation.expireAfter.split(" ")[0])
      if (expireAfter > 0) {
        /**
         * moment library used to campare dates
         */
        if (moment(date).isBetween(relation.createdAt, moment(relation.createdAt).add(expireAfter, 'd'))) {
          limited.push(relation.dataValues)
        }
      } else if (expireAfter == 0) {
        unlimited.push(relation.dataValues)
      }
    }
    /**
     * limited and unlimited are concated in sorted data
     */
    sortedData = limited.concat(unlimited)
    return sortedData
  }
  /**
   * function to sum the number of allowed messages
   * @param  data message to sum
   * @returns data
   */
  async sortByNoOfMessages(data) {
    let sumOfMessages = 0
    /**
     * for loop to sum the number of essages
     */
    for (let relation of data) {
      sumOfMessages = relation.numberOfMessageAllowed + sumOfMessages
    }
    /**
     * return sum of messages
     */
    return sumOfMessages
  }
  /**
   * function to save messages
   * @param  data information of messages
   * @returns data
   */
  async saveReceivedSms(data) {
    return await db.recievedSms.create(data);
  }
  /**
   * function to save messages
   * @param data information of messages 
   * @param updateQuery update data query
   * @returns data
   */
  async updateReceivedSms(data, updateQuery) {
    return await db.recievedSms.update(data, updateQuery);
  }
  /**
   * function to save smsplus messages
   * @param data information of messages 
   * @returns data
   */
  async saveReceivedSmsContent(data) {
    return await db.smsPlusRecievedMessage.create(data);
  }
  /**
   * function to save smsplus service
   * @param data information of service 
   * @returns data
   */
  async saveSmsPlusService(data) {
    return await db.smsPlusCheckKeyword.create(data);
  }
  /**
   * function to save televoting service
   * @param data information of service 
   * @returns data
   */
  async saveTeleVotingService(data) {
    return await db.teleVotingCheckKeyword.create(data);
  }
  /**
   * function to save smsplus deduction messages
   * @param data information of messages 
   * @returns data
   */
  async saveSmsPlusDeduction(data) {
    return await db.smsPlusBalanceDeduction.create(data);
  }
  /**
   * function to save smsplus sent messages
   * @param data information of messages 
   * @returns data
   */
  async saveSmsPlusSentMessage(data) {
    return await db.smsPlusSentMessage.create(data);
  }
  /**
   * function to save smsplus successfull messages
   * @param data information of messages 
   * @returns data
   */
  async saveSmsPlusSuccessfullMessage(data) {
    return await db.smsPlusSuccessfullMessage.create(data);
  }
  /**
   * function to save campaigns
   * @param data information of messages 
   * @returns data
   */
  async createCampaign(data) {
    return await db.campaigns.upsert(data);
  }
  /**
   * function to save campaign contacts
   * @param data information of messages 
   * @returns data
   */
  async selectedContactCampaign(data) {
    return await db.selectedContactCampaigns.upsert(data);
  }
  /**
   * function to get contact lists
   * @param whereClause information of messages 
   * @returns data
   */
  async getContactList(whereClause) {
    return await db.selectedContactCampaigns.findAll(whereClause);
  }
  /**
   * function to get specific contact list
   * @param whereClause information of contact list 
   * @returns data
   */
  async getSpecificContactList(whereClause) {
    return await db.selectedContactCampaigns.findOne(whereClause);
  }
  /**
   * function to get campaign
   * @param whereClause information of campaign 
   * @returns data
   */
  async getCampaign(whereClause) {
    return await db.campaigns.findOne(whereClause);
  }
  /**
   * function to get all campaigns
   * @param whereClause information of campaigns 
   * @returns data
   */
  async getAllCampaign(whereClause) {
    return await db.campaigns.findAll(whereClause);
  }
  /**
   * function to get all contacts
   * @param whereClause information of contacts
   * @returns data
   */
  async getAllContacts(whereClause) {
    return await db.contacts.findAll(whereClause);
  }
  /**
   * function to send campaign sms
   * @param whereClause information of campaigns 
   * @returns data
   */
  async sendCampaignSms(data, contacts, serviceId) {
    /**
     * for loop on contacts 
     */
    for (let relation of contacts) {
      /**
       * replacing given name string with relevent data
       */
      const message = data.message.replace(/{Given Name}/g, relation.dataValues.name)
      /**
       * replacing phone number string with relevent data
       */
      const message2 = message.replace(/{Phone Number}/g, relation.dataValues.phoneNumber)
      /**
       * final message data
       */
      let messageData = {
        from: data.from,
        message: message2,
        to: relation.dataValues.phoneNumber
      }
      /**
       * Api call to send sms
       */
      this.sendSms(messageData)
      /**
       * final message data to save in database
       */
      let saveMessageData = {
        from: data.from,
        message: message2,
        to: relation.dataValues.phoneNumber,
        serviceId: serviceId,
        userId: data.userId,
        campaignId: data.id
      }
      /**
       * call to save data in database
       */
      this.saveSms(saveMessageData)
    }
  }
}

module.exports = SmsService;