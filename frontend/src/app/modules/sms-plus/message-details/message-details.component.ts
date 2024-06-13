/**
 * this is message details component
 */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { TableInfo } from "src/app/component/componentModel/table-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-message-details",
  templateUrl: "./message-details.component.html",
  styleUrls: ["./message-details.component.css"],
})
export class MessageDetailsComponent implements OnInit {
  /**
   * receive message table headers
   */
  recievedMessageTableHeaders = [
    { field: "dateTime", header: "Date & Time", type: "date", edit: "false" },
    { field: "msisdn", header: "MSISDN", type: "text", edit: "false" },
    { field: "msgContent", header: "Message", type: "text", edit: "false" },
    { field: "shortCode", header: "Short Code", type: "text", edit: "false" },
    {
      field: "status",
      header: "Status",
      type: "text",
      edit: "false",
    },
  ];
  /**
   * sent message table headers
   */
  sentMessageTableHeaders = [
    { field: "dateTime", header: "Date & Time", type: "date", edit: "false" },
    { field: "msisdn", header: "MSISDN", type: "text", edit: "false" },
    {
      field: "msgContent",
      header: "Message Content",
      type: "text",
      edit: "false",
    },
    { field: "shortCode", header: "Short Code", type: "text", edit: "false" },
    { field: "status", header: "Status", type: "text", edit: "false" },
  ];
  /**
   * successfull message table headers
   */
  successfullMessageTableHeaders = [
    { field: "dateTime", header: "Date & Time", type: "date", edit: "false" },
    { field: "msisdn", header: "MSISDN", type: "text", edit: "false" },
    {
      field: "msgContent",
      header: "Message Content",
      type: "text",
      edit: "false",
    },
    { field: "shortCode", header: "Short Code", type: "text", edit: "false" },
    { field: "status", header: "Status", type: "text", edit: "false" },
  ];
  /**
   * check keyword message table headers
   */
  checkKeywordMessageTableHeaders = [
    { field: "dateTime", header: "Date & Time", type: "date", edit: "false" },

    {
      field: "serviceName",
      header: "Service Name",
      type: "text",
      edit: "false",
    },
    { field: "keyword", header: "Keyword", type: "text", edit: "false" },
    { field: "code", header: "Code", type: "text", edit: "false" },
    { field: "promoCode", header: "Promo Code", type: "text", edit: "false" },
    { field: "price", header: "Price", type: "text", edit: "false" },
    { field: "currency", header: "Currency", type: "text", edit: "false" },
    { field: "status", header: "Status", type: "text", edit: "false" },
    { field: "shortCode", header: "Short Code", type: "text", edit: "false" },
    {
      field: "countryOperator",
      header: "Country/Operator",
      type: "text",
      edit: "false",
    },
    { field: "expiryDate", header: "Expiry Date", type: "date", edit: "false" },
  ];
  /**
   * balance deduction message table headers
   */
  balanceDeductionMessageTableHeaders = [
    { field: "dateTime", header: "Date & Time", type: "date", edit: "false" },
    { field: "msisdn", header: "MSISDN", type: "text", edit: "false" },
    {
      field: "keyword",
      header: "Keyword",
      type: "text",
      edit: "false",
    },
    {
      field: "msgContent",
      header: "Message Content",
      type: "text",
      edit: "false",
    },
    { field: "shortCode", header: "Short Code", type: "text", edit: "false" },
    { field: "status", header: "Status", type: "text", edit: "false" },
  ];
  /**
   * error message table headers
   */
  errorMessageTableHeaders = [
    { field: "dateTime", header: "Date & Time", type: "date", edit: "false" },
    { field: "msisdn", header: "MSISDN", type: "text", edit: "false" },
    {
      field: "msgContent",
      header: "Message Content",
      type: "text",
      edit: "false",
    },
    { field: "shortCode", header: "Short Code", type: "text", edit: "false" },
    { field: "step", header: "Step", type: "text", edit: "false" },
  ];
  /**
   * receive message table info
   */
  recievedMessageTableInfo: TableInfo[] = [];
  /**
   * sent message table info
   */
  sentMessageTableInfo: TableInfo[] = [];
  /**
   * successfull message table info
   */
  successfullMessageTableInfo: TableInfo[] = [];
  /**
   * check keyword message table info
   */
  checkKeywordMessageTableInfo: TableInfo[] = [];
  /**
   * balance deduction message table info
   */
  balanceDeductionMessageTableInfo: TableInfo[] = [];
  /**
   * receive message error flag
   */
  rErrorMessageFlag = false;
  /**
   * check keyword message error flag
   */
  cErrorMessageFlag = false;
  /**
   * balance deduction message error flag
   */
  bErrorMessageFlag = false;
  /**
   * sent message error flag
   */
  sErrorMessageFlag = false;
  /**
   * error message flag
   */
  errorMessageFlag = false;
  /**
   *
   * @param activatedRoute is a activated router type variable created to used to retrieve the data in our url if any
   * @param Jarwis is an angular service type variable used to call APIs required for our application
   * @param tokenStorage is an angular service type variable used to call custom functions
   * @param messageService is a message type variable created to display messages in our component
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private Jarwis: AuthService,
    private tokenStorage: TokenStorageService,
    private messageService: MessageService
  ) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      let obj = {
        messageId: queryParams.id,
        type: "smsPlus",
      };
      this.Jarwis.getMessageDetails(obj).subscribe(
        (data) => this.handleData(data),
        (error) => this.handleError(error)
      );
    });
  }
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {}
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleData(data) {
    // Recieved Message Data
    data.recievedMessage.forEach((item) => {
      let obj = new TableInfo();
      obj.dateTime = item.createdAt;
      obj.msisdn = item.msisdn;
      obj.msgContent = item.message;
      obj.status = item.status;
      obj.shortCode = item.shortCode;
      obj.recievedSmsId = item.recievedSmsId;
      this.recievedMessageTableInfo.push(obj);
    });
    // Keyword Message Data

    data.checkKeywordMessage.forEach((item) => {
      let obj = new TableInfo();
      obj.dateTime = item.createdAt;
      obj.serviceName = item.serviceName;
      obj.keyword = item.keyword;
      obj.code = item.code;
      obj.shortCode = item.shortCode;
      obj.expiryDate = item.expiryDate;
      obj.promoCode = item.promoCode;
      obj.price = item.price;
      obj.currency = item.currency;
      obj.status = item.status;
      obj.countryOperator = item.countryoperator;
      this.checkKeywordMessageTableInfo.push(obj);
    });
    // Balance Deduction Message Data

    data.balanceDeductionMessage.forEach((item) => {
      let obj = new TableInfo();
      obj.dateTime = item.createdAt;
      obj.balance = item.balance;
      obj.msgContent = item.message;
      obj.msisdn = item.msisdn;
      obj.status = item.status;
      obj.shortCode = item.shortCode;
      obj.keyword = item.recievedSm.smsPlusCheckKeywords[0].keyword;
      this.balanceDeductionMessageTableInfo.push(obj);
    });
    // Successfull Message Data

    data.successfullMessage.forEach((item) => {
      let obj = new TableInfo();
      obj.dateTime = item.createdAt;
      obj.msgContent = item.message;
      obj.status = item.status;
      obj.msisdn = item.msisdn;
      obj.shortCode = item.shortCode;
      this.successfullMessageTableInfo.push(obj);
    });
    // Sent Message Data

    data.sentMessage.forEach((item) => {
      let obj = new TableInfo();
      obj.dateTime = item.createdAt;
      obj.msisdn = item.msisdn;
      obj.msgContent = item.message;
      obj.status = item.status;
      obj.shortCode = item.shortCode;
      this.sentMessageTableInfo.push(obj);
    });
    if (data.errorMessage && data.errorMessage.length > 0) {
      data.errorMessage.forEach((item) => {
        let obj = new TableInfo();
        obj.dateTime = item.createdAt;
        obj.msisdn = item.recievedSm.msisdn;
        obj.msgContent = item.message;
        obj.step = item.step;
        obj.shortCode = item.shortCode;
        obj.recievedSmsId = item.recievedSmsId;
        if (item.step == "Check Keyword") {
          this.cErrorMessageFlag = true;
          this.checkKeywordMessageTableInfo = [];
          this.checkKeywordMessageTableInfo.push(obj);
        }
        if (item.step == "Billing") {
          this.bErrorMessageFlag = true;
          this.balanceDeductionMessageTableInfo = [];
          this.balanceDeductionMessageTableInfo.push(obj);
        }
        if (item.step == "Reply Message") {
          // this.checkKeywordMessageTableInfo.push(obj);
        }
      });
    }
  }
  /**
   * handle error is our function to handle error given by APi or custom made
   * @param error is the variable through which we recieve the error to display to the user
   */
  handleError(error) {
    this.addMessages("error", "Error", error.message);
  }
  /**
   * this is our function to call the message service to display our required message
   * @param severity defines the type/severity of the message to be displayed
   * @param summary defines the summary of the message
   * @param detail contains the string of the message to be displayed
   */
  addMessages(severity, summary, detail) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      sticky: true,
    });

    setTimeout(() => {
      this.messageService.clear();
    }, 2000);
  }
}
