const db = require("../models/index.js");
const link = require("../config/url.js");
const rp = require("request-promise");

class PlatformService {
  constructor() {}
  async getService(data) {
    var options = {
      method: "POST",
      uri: link.platformUrl + "/plan_details",
      body: {
        keyword: data.keyword,
        msisdn: data.msisdn,
        unique_key: data.uniqueKey,
        channel: data.channel,
      },
      headers: {
        "content-type": "application/json",
        Authorization: link.platformKey,
      },
      json: true,
    };

    return await rp(options);
  }
  async getReplyMessage(data) {
    var options = {
      method: "POST",
      uri: link.platformUrl + "/reply_message",
      body: {
        keyword: data.keyword,
        msisdn: data.msisdn,
        unique_key: data.uniqueKey,
        channel: data.channel,
      },
      headers: {
        "content-type": "application/json",
        Authorization: link.platformKey,
      },
      json: true,
    };

    return await rp(options);
  }
  async getReplyMessageTelevoting(data) {
    var options = {
      method: "POST",
      uri: link.platformUrl + "/store_answer?service_name="+data.service_name+"&answer="+data.answer+"&msisdn="+data.msisdn+"&keyword="+data.keyword+"&channel=" + data.channel,
      headers: {
        "content-type": "application/json",
        Authorization: link.platformKey,
      },
      json: true,
    };

    return await rp(options);
  }
  async saveDebitStatus(data) {
    let allowedServices = ['GAME30', 'GAME7', 'JEU1', 'JEU7', 'JEU30'];
    if(allowedServices.find((item) => item == data.keyword)) {
      var options = {
        method: "GET",
        uri: link.billingDebit + "?ch="+data.channel+"&sc="+data.shortCode+"&kw="+data.keyword+"&pr="+data.price+"&st=ok&vc="+data.voucher+"&tr=" + data.transactionId,
        
        headers: {
          "content-type": "application/json",
        },
        json: true,
      };
  
      return await rp(options);
    }
    return;
  }
}


module.exports = PlatformService;
