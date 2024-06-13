const db = require("../models/index.js");
const soapRequest = require("easy-soap-request");
const link = require("../config/url.js");

class InBillingService {
  constructor() {}
  async deductBalance(data) {
    const url = link.inBillingUrl;
    const sendingHeaders = {
      "user-agent": "sampleTest",
      "Content-Type": "text/xml;charset=UTF-8",
    };
    const xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ocs="http://ocs.ztesoft.com"><soapenv:Header><AuthHeader xmlns="http://ztesoft.com/webservices/">     <Username>INNOVASAS</Username>      <Password>INNOVASAS#28</Password> </AuthHeader></soapenv:Header><soapenv:Body><ocs:doService><ocs:in0><![CDATA[<?xml version="1.0" encoding="UTF 8"?><zsmart><Data><header><ACTION_ID>ModUserIndiPricePlan</ACTION_ID> <REQUEST_ID>07020211122000000' + data.requestId + '</REQUEST_ID></header><body> <MSISDN>' + data.msisdn.replace('+', '') + '</MSISDN><UserPwd>000000</UserPwd><PricePlanChgDtoList><PricePlanChgDto> <PricePlanIndex>' + data.billingCode + '</PricePlanIndex><Action>1</Action><EffType>2</EffType><EffDate></EffDate><ExpDate></ExpDate><ChargeFlag>1</ChargeFlag></PricePlanChgDto></PricePlanChgDtoList></body></Data></zsmart>]]></ocs:in0></ocs:doService></soapenv:Body></soapenv:Envelope>';
    return await soapRequest({
      url: url,
      headers: sendingHeaders,
      xml: xml,
    });
  }
  async deductBalanceFrom2ndOperator(data) {
    const url = link.inBilling2Url;
    const sendingHeaders = {
      "Authorization": link.inBilling2Key,
      "Content-Type": 'text/xml',
      "User-Agent": 'UGw Server/5.0/1.0',
    };
    const xml = '<?xml version="1.0"?><methodCall>    <methodName>UpdateBalanceAndDate</methodName>    <params>      <param>        <value>          <struct>            <member>              <name>originNodeType</name>              <value>                <string>EXT</string>              </value>            </member>            <member>              <name>originHostName</name>              <value>                <string>innovas</string>              </value>            </member>            <member>              <name>originTransactionID</name>              <value>                <string>200623233225240</string>              </value>            </member>            <member>              <name>originTimeStamp</name>              <value>                <dateTime.iso8601>20220715T15:08:25+0100</dateTime.iso8601>              </value>            </member>            <member>              <name>subscriberNumber</name>              <value>                <string>' + data.msisdn.replace('+', '').substring(3) + '</string>              </value>            </member>            <member>              <name>transactionCurrency</name>              <value>                <string>XOF</string>              </value>            </member>        <member>              <name>adjustmentAmountRelative</name>              <value>                <string>-' + data.amount + '</string>              </value>            </member>          </struct>        </value>      </param>    </params>  </methodCall>'
    // const xml = '<?xml version="1.0"?><methodCall>  <methodName>UpdateBalanceAndDate</methodName>  <params>    <param>      <value>        <struct>          <member>            <name>originNodeType</name>            <value>              <string>EXT</string>            </value>          </member>          <member>            <name>originHostName</name>            <value>              <string>innovas</string>            </value>          </member>          <member>            <name>originTransactionID</name>            <value>              <string>200623233225240</string>            </value>          </member>          <member>            <name>originTimeStamp</name>            <value>              <dateTime.iso8601>20200623T23:32:25+0100</dateTime.iso8601>            </value>          </member>          <member>            <name>subscriberNumber</name>            <value>              <string>'+data.msisdn.replace('+', '')+'</string>            </value>          </member>          <member>            <name>transactionCurrency</name>            <value>              <string>XOF</string>            </value>          </member>        <member>                        <name>adjustmentAmountRelative</name>                        <value>                          <string>-'+data.amount+'</string>                        </value>                      </member>                    </struct>                  </value>                </data>              </array>            </value>          </member>        </struct>      </value>    </param>  </params></methodCall>'
    return await soapRequest({
      url: url,
      headers: sendingHeaders,
      xml: xml,
    });
  }
}

module.exports = InBillingService;