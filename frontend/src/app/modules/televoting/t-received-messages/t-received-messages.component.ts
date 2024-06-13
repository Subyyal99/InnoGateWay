import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { TableInfo } from "src/app/component/componentModel/table-info";

@Component({
  selector: "app-t-received-messages",
  templateUrl: "./t-received-messages.component.html",
  styleUrls: ["./t-received-messages.component.css"],
})
export class TReceivedMessagesComponent implements OnInit {
  tableHeaders = [
    { field: "dateTime", header: "Date & Time", type: "date", edit: "false" },
    { field: "shortCode", header: "Short Code", type: "text", edit: "false" },
    { field: "msisdn", header: "MSISDN", type: "text", edit: "false" },
    { field: "msgContent", header: "Message", type: "text", edit: "false" },
    {
      field: "status",
      header: "Status",
      type: "text",
      edit: "false",
    },
  ];
  tableInfo = [];
  /**
   *
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param messageService is a message type variable created to display messages in our component
   * @param Jarwis is an angular service type variable used to call APIs required for our application
   */
  constructor(
    private router: Router,
    private messageService: MessageService,
    private Jarwis: AuthService
  ) {}
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    this.getSms();
  }
  /**
   * our function to call the API to get data
   */
  getSms() {
    this.Jarwis.getTelevotingMessage().subscribe(
      (data) => this.handleSmsData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleSmsData(data) {
    this.tableInfo = [];
    data.messageData.forEach((item) => {
      let obj = new TableInfo();
      obj.dateTime = item.createdAt;
      obj.msisdn = item.msisdn;
      obj.msgContent = item.message;
      obj.status = item.status;
      obj.shortCode = item.recievedSm.ShortCode.shortCode;
      obj.recievedSmsId = item.recievedSmsId;
      this.tableInfo.push(obj);
    });
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
  /**
   * this is our function to route the user to a specific page
   * @param id recieves the required id for the routing
   */
  getDetails(id) {
    this.router.navigate(["side-panel/televoting/message-detail"], {
      queryParams: { id: id },
    });
  }
}
