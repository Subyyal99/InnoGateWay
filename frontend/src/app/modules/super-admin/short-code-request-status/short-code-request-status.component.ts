/**
 * THIS IS SHORT CODE REQUEST STATUS COMPONENT
 */
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-short-code-request-status",
  templateUrl: "./short-code-request-status.component.html",
  styleUrls: ["./short-code-request-status.component.css"],
})
export class ShortCodeRequestStatusComponent implements OnInit {
  /**
   * request check flag
   */
  requestFlag: boolean = false;
  /**
   * table header to display
   */
  tableHeaders = [
    { field: "name", header: "Admin Name", type: "text", edit: "false" },

    {
      field: "smscUsername",
      header: "Smsc Username",
      type: "text",
      edit: "false",
    },

    {
      field: "status",
      header: "Status",
      type: "text",
      edit: "false",
    },

    {
      field: "type",
      header: "Type",
      type: "text",
      edit: "false",
    },

    {
      field: "createdAt",
      header: "Date",
      type: "date",
      edit: "false",
    },
  ];
  /**
   * table info
   */
  tableInfo = [];
  /**
   *
   * @param messageService is a message type variable created to display messages in our component
   * @param Jarwis is an angular service type variable used to call APIs required for our application
   */
  constructor(
    private messageService: MessageService,
    private Jarwis: AuthService
  ) {}
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    this.getShortCodeEditedRequests();
  }
  /**
   * our function to call the API to get new short code or to edit short code requests
   */
  getShortCodeEditedRequests() {
    this.Jarwis.getShortCodeEditedRequests().subscribe(
      (data) => this.handleServiceData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleServiceData(data) {
    if (data.data.length > 0) {
      this.requestFlag = true;
      this.tableInfo = [];
      this.tableInfo = data.data;
      this.tableInfo.forEach((element) => {
        element.name = element.User.firstName + " " + element.User.lastName;
      });
    } else {
      this.requestFlag = false;
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
