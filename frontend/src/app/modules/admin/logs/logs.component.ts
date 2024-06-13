import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { TableInfo } from "src/app/component/componentModel/table-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-logs",
  templateUrl: "./logs.component.html",
  styleUrls: ["./logs.component.css"],
})
export class LogsComponent implements OnInit {
  /**
   * variable to store data for table
   */
  tableInfo: TableInfo[] = [];
  /**
   * header of the table to display
   */
  tableHeaders = [
    {
      field: "dateTime",
      header: "Date",
      type: "dateTime",
      edit: "false",
      justDelete: "true",
    },
    {
      field: "msgContent",
      header: "Message ",
      type: "text",
      edit: "false",
      justDelete: "true",
    },
    {
      field: "type",
      header: "Type",
      type: "text",
      edit: "false",
      justDelete: "true",
    },
  ];
  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param Jarwis This connects Backend with Frontend
   * @param messageService is a message type variable created to display messages in our component
   */
  constructor(
    private Jarwis: AuthService,
    private messageService: MessageService
  ) {}
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    this.getLogs();
  }
  /**
   * our function to call the API to get logs
   */
  getLogs() {
    this.Jarwis.getLogs().subscribe(
      (data) => this.handleLogsData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleLogsData(data) {
    if (data.data && data.data.length > 0) {
      data.data.forEach((log) => {
        let obj = new TableInfo();
        obj.dateTime = log.createdAt;
        obj.msgContent = log.message;
        obj.type = log.type;
        obj.id = log.id;
        this.tableInfo.push(obj);
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
    this.messageService.clear();
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      sticky: true,
    });
    setTimeout(() => {
      this.messageService.clear();
    }, 3000);
  }
}
