/**
 * constant database (db) variable to access models 
 */
const db = require("../models/index.js");
/**
 * Class to create a smsPlus service object
 */
class SmsPlusService {
    constructor() {}
    /**
     * function to find all received sms
     * @param whereClause to specify data in db
     * @returns desired data 
     */
    async recievedSms(whereClause) {
        return await db.recievedSms.findAll(whereClause)
    }
    /**
     * function to find all smsplus received sms
     * @param whereClause to specify data in db
     * @returns desired data 
     */
    async RecievedMessages(whereClause) {
        return await db.smsPlusRecievedMessage.findAll(whereClause)
    }
    /**
     * function to find all smsplus received sms count
     * @param whereClause to specify data in db
     * @returns desired data 
     */
    async receivedMessageCount(whereClause) {
        return await db.smsPlusRecievedMessage.count(whereClause);
    }
    /**
     * function to find all smsplus balance deduction sms
     * @param whereClause to specify data in db
     * @returns desired data 
     */
    async BalanceDeductionMessages(whereClause) {
        return await db.smsPlusBalanceDeduction.findAll(whereClause)
    }
    /**
     * function to find all smsplus balance deduction sms count
     * @param whereClause to specify data in db
     * @returns desired data 
     */
    async balanceDeductionMessageCount(whereClause) {
        return await db.smsPlusBalanceDeduction.count(whereClause);
    }
    /**
     * function to find all smsplus check keyword sms
     * @param whereClause to specify data in db
     * @returns desired data 
     */
    async CheckKeywordMessages(whereClause) {
        return await db.smsPlusCheckKeyword.findAll(whereClause)
    }
    /**
     * function to find all smsplus check keyword sms count
     * @param whereClause to specify data in db
     * @returns desired data 
     */
    async checkKeywordMessageCount(whereClause) {
        return await db.smsPlusCheckKeyword.count(whereClause);
    }
    /**
     * function to find all televoting check keyword sms count
     * @param whereClause to specify data in db
     * @returns desired data 
     */
    async tCheckKeywordMessageCount(whereClause) {
        return await db.teleVotingCheckKeyword.count(whereClause);
    }
    /**
     * function to find all televoting check keyword sms
     * @param whereClause to specify data in db
     * @returns desired data 
     */
    async TCheckKeywordMessages(whereClause) {
        return await db.teleVotingCheckKeyword.findAll(whereClause)
    }
    /**
     * function to find all televoting check keyword sms count
     * @param whereClause to specify data in db
     * @returns desired data 
     */
    async TCheckKeywordMessageCount(whereClause) {
        return await db.teleVotingCheckKeyword.count(whereClause);
    }
    /**
     * function to find all smsplus sent sms
     * @param whereClause to specify data in db
     * @returns desired data 
     */
    async SentMessages(whereClause) {
        return await db.smsPlusSentMessage.findAll(whereClause)
    }
    /**
     * function to find all smsplus sent sms count
     * @param whereClause to specify data in db
     * @returns desired data 
     */
    async sentMessageCount(whereClause) {
        return await db.smsPlusSentMessage.count(whereClause);
    }
    /**
     * function to find all smsplus successfull sms
     * @param whereClause to specify data in db
     * @returns desired data 
     */
    async SuccessfullMessages(whereClause) {
        return await db.smsPlusSuccessfullMessage.findAll(whereClause)
    }
    /**
     * function to find all smsplus successfull sms count
     * @param whereClause to specify data in db
     * @returns desired data 
     */
    async successfullMessageCount(whereClause) {
        return await db.smsPlusSuccessfullMessage.count(whereClause);
    }
    /**
     * function to save custom sms
     * @param data to specify data in db
     * @returns desired data 
     */
    async saveCustomMessage(data) {
        return await db.smsPlusCustomMessage.upsert(data);
    }
    /**
     * function to find all custom
     * @returns desired data 
     */
    async getAllCustomMessage() {
        return await db.smsPlusCustomMessage.findAll();
    }
    /**
     * function to find one existing message check
     * @returns desired data 
     */
    async checkExisting(whereClause) {
        return await db.smsPlusCustomMessage.findOne(whereClause);
    }
    /**
     * function to update custom sms
     * @param data to specify data in db
     * @returns desired data 
     */
    async updateCustomMessage(data) {
        return await db.smsPlusCustomMessage.upsert(data);
    }
    /**
     * function to find received sms
     * @returns desired data 
     */
    async RecievedSms() {
        return await db.recievedSms.findAll()
    }
    /**
     * function to find received sms count
     * @returns desired data 
     */
    async RecievedSmsCount() {
        return await db.recievedSms.count()
    }
    /**
     * function to find graph data
     * @param name name of the database
     * @param whereClause to specify data in db
     * @returns desired data 
     */
    async graphData(name, whereClause) {
        return await db[name].findAll(whereClause)
    }
    /**
     * function to find graph data
     * @param name name of the database
     * @param whereClause to specify data in db
     * @returns desired data 
     */
    async graphData2(name, whereClause) {
        return await db[name].findAll(whereClause)
    }
}
module.exports = SmsPlusService;