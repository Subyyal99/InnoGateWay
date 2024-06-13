import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { TableInfo } from "src/app/component/componentModel/table-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-t-check-keyword",
  templateUrl: "./t-check-keyword.component.html",
  styleUrls: ["./t-check-keyword.component.css"],
})
export class TCheckKeywordComponent implements OnInit {
  tableHeaders = [
    {
      field: "serviceName",
      header: "Service Name",
      type: "text",
      edit: "false",
    },
    { field: "keyword", header: "Keyword", type: "text", edit: "false" },
    { field: "shortCode", header: "Short Code", type: "text", edit: "false" },
    { field: "price", header: "Price", type: "text", edit: "false" },
    { field: "currency", header: "Currency", type: "text", edit: "false" },
    {
      field: "countryOperator",
      header: "Country/Operator",
      type: "text",
      edit: "false",
    },
    { field: "msisdn", header: "MSISDN", type: "text", edit: "false" },
    { field: "channel", header: "Channel", type: "text", edit: "false" },
    { field: "status", header: "Status", type: "text", edit: "false" },

    { field: "dateTime", header: "Date & Time", type: "date", edit: "false" },
  ];
  tableInfo: TableInfo[] = [];
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
    this.Jarwis.getTelevotingCheckKeywordMessage().subscribe(
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
      obj.recievedSmsId = item.recievedSmsId;
      obj.dateTime = item.createdAt;
      obj.serviceName = item.serviceName;
      obj.keyword = item.keyword;
      obj.channel = item.channel;
      obj.shortCode = item.recievedSm.ShortCode.shortCode;
      obj.msisdn = item.recievedSm.msisdn;
      obj.price = item.price;
      obj.currency = item.currency;
      obj.status = item.status;
      obj.countryOperator = item.countryoperator;
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
