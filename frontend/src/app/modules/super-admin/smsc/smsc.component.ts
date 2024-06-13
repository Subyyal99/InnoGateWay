/**
 * this is SMSC component
 */
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { TableInfo } from "src/app/component/componentModel/table-info";
import { LoginInfo } from "src/app/models/login-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-smsc",
  templateUrl: "./smsc.component.html",
  styleUrls: ["./smsc.component.css"],
})
export class SmscComponent implements OnInit {
  // comments in this file might be needed later if not i will remove them after words
  /**
   * smsc and service data check flag
   */
  serviceFlag: boolean = false;
  /**
   * delete data check flag
   */
  deleteFlag: boolean = false;
  /**
   * modal name and open access
   */
  modalName = "";
  /**
   * user id
   */
  userId: number;
  /**
   * allowed SMSC array
   */
  smscAllowed = [];
  /**
   * table check object
   */
  checkTable = {};
  /**
   * client data object
   */
  userData = new LoginInfo();
  /**
   * table headers
   */
  tableHeaders = [
    {
      field: "smscName",
      header: "Name",
      type: "text",
      edit: "false",
    },
    { field: "status", header: "Status", type: "text", edit: "true" },

    {
      field: "country",
      header: "Country",
      type: "text",
      edit: "false",
    },
    {
      field: "action",
      header: "Action",
      type: "editButton",
      edit: "false",
      justDelete: "true",
    },
  ];
  /**
   * table headers
   */
  tableHeaders2 = [
    { field: "shortCode", header: "Short Code", type: "text", edit: "false" },

    { field: "status", header: "Status", type: "text", edit: "true" },

    {
      field: "action",
      header: "Action",
      type: "editButton",
      edit: "false",
      justDelete: "true",
    },
  ];
  /**
   * table info to display
   */
  tableInfo = [];
  /**
   * table info to display
   */
  tableData = [];

  /**
   *
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param messageService is a message type variable created to display messages in our component
   * @param Jarwis is an angular service type variable used to call APIs required for our application
   * @param activatedRoute is a activated router type variable created to used to retrieve the data in our url if any
   */
  constructor(
    private router: Router,
    private messageService: MessageService,
    private Jarwis: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.userId = queryParams.id;
      this.Jarwis.getClient({ id: this.userId }).subscribe(
        (data) => this.handleUserData(data),
        (error) => this.handleError(error)
      );
      this.getAdminSmsc();
    });
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleUserData(data) {
    this.userData = data.data;
    // if (data.data.length > 0) {
    //   data.data.forEach((element) => {
    //     if (element.id == this.userId) {
    //       this.userData = element;
    //     }
    //   });
    // }
  }
  /**
   * our function to call the API to get data
   */
  getAdminSmsc() {
    this.Jarwis.getAdminSmsc({ id: this.userId }).subscribe(
      (data) => this.handleSmscData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleSmscData(data) {
    if (data.data.length > 0) {
      this.serviceFlag = true;
      this.smscAllowed = data.data;
      this.tableInfo = [];
      this.tableData = [];
      data.data.forEach((item) => {
        let obj = new TableInfo();
        obj.id = item.id;
        obj.smscName = item.Smsc.name;
        obj.status = item.status;
        obj.country = item.Smsc.country;

        this.tableInfo.push(obj);
      });
      // this.smscAllowed.forEach((service) => {
      //   this.tableInfo[service.Service.name] = [];
      //   this.tableData.forEach((item) => {
      //     if (service.Service.name == item.serviceName) {
      //       this.tableInfo[item.serviceName].push(item);
      //     }
      //   });
      // });
    } else {
      this.serviceFlag = false;
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
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {}
  /**
   * function to open our modal
   */
  addService() {
    this.modalName = "test";
  }
  /**
   * our function to receive data from our input fields provided by the user
   * @param data contain the data required
   */
  updateSmscData(data) {
    this.Jarwis.updateSmscData({
      id: data.id,
      status: data.status,
    }).subscribe(
      (data) => this.handleUpdatedData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * our function to call the API to get data and close modal
   */
  recievedData() {
    this.modalName = "";
    this.Jarwis.getAdminSmsc({ id: this.userId }).subscribe(
      (data) => this.handleSmscData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleUpdatedData(data) {
    this.addMessages("success", "Success", data.message);
    this.getAdminSmsc();
  }
}
