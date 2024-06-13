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
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.css"],
})
export class ServicesComponent implements OnInit {
  /**
   * flag used to decide what data to show
   */
  serviceFlag: boolean = false;
  /**
   * to delete service table
   */
  deleteFlag: boolean = false;
  /**
   * string type variable to open modals
   */
  modalName = "";
  /**
   * id of the user is saved in this variable
   */
  userId: number;
  /**
   * data of the allowed services is saved in this array
   */
  servicesAllowed = [];
  /**
   * not being used
   */
  checkTable = {};
  /**
   * user data to show on our page is stored in this variable
   */
  userData = new LoginInfo();
  /**
   * header of the table to display
   */
  tableHeaders = [
    {
      field: "createdAt",
      header: "Date",
      type: "date",
      edit: "false",
    },
    { field: "shortCode", header: "Short Code", type: "text", edit: "false" },

    { field: "status", header: "Status", type: "text", edit: "true" },
    {
      field: "expireAfter",
      header: "Days Allowed",
      type: "text",
      edit: "false",
    },
    {
      field: "noOfMessageAllowed",
      header: "Messages Allowed",
      type: "text",
      edit: "false",
    },
    {
      field: "noOfMessageSent",
      header: "Messages Sent",
      type: "text",
      edit: "false",
    },
    {
      field: "noOfMessageRemaining",
      header: "Messages Remaining",
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
   * another array of table headers
   */
  tableHeaders2 = [
    {
      field: "createdAt",
      header: "Date",
      type: "date",
      edit: "false",
    },
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
   * variable to store data for table
   */
  tableInfo = [];
  /**
   * variable to store data for table
   */
  tableData = [];
  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param Jarwis This connects Backend with Frontend
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param messageService is a message type variable created to display messages in our component
   * @param activatedRoute is a router type variable created to use router functions to navigate within our project
   *
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
      this.getUserServices();
    });
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleUserData(data) {
    this.userData = data.data;
  }
  getUserServices() {
    this.Jarwis.getUserServices({ id: this.userId }).subscribe(
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
      this.serviceFlag = true;
      this.servicesAllowed = data.data;
      this.tableInfo = [];
      this.tableData = [];
      data.messageData.forEach((item) => {
        let status = "";
        let todayDate = new Date();
        let createdDate = new Date(item.createdAt);
        if (item.expireAfter) {
          let expireAfter = Number(item.expireAfter.split(" ")[0]);

          let newDate =
            expireAfter != 0 ? this.addDays(createdDate, expireAfter) : "";
          if (newDate) {
            if (todayDate < newDate) {
              status = item.status;
            } else {
              status = "Expired";
            }
          } else {
            status = item.status;
          }
        }

        // this.addDays(item.createdAt, Number(item.expireAfter.splice(" ")[0]));
        let obj = new TableInfo();
        obj.noOfMessageAllowed = item.numberOfMessageAllowed;
        obj.noOfMessageSent = 0;
        obj.noOfMessageRemaining = item.numberOfMessageAllowed;
        obj.status = status;
        obj.expireAfter = item.expireAfter;
        obj.createdAt = createdDate;
        obj.relationTableId = item.id;
        obj.shortCode = item.ShortCode.shortCode;
        obj.serviceName = item.Service.name;
        this.tableData.push(obj);
      });
      this.servicesAllowed.forEach((service) => {
        this.tableInfo[service.Service.name] = [];
        this.tableData.forEach((item) => {
          if (service.Service.name == item.serviceName) {
            this.tableInfo[item.serviceName].push(item);
          }
        });
      });
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
   * this function opens modal to add user service
   */
  addService() {
    this.modalName = "test";
  }
  /**
   * this API call updates the package saved in our db across any service
   * @param data data to update
   */
  updateServiceData(data) {
    this.Jarwis.updateServiceData({
      id: data.relationTableId,
      status: data.status,
    }).subscribe(
      (data) => this.handleUpdatedServiceData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * API call to gett user services
   */
  recievedData() {
    this.modalName = "";
    this.Jarwis.getUserServices({ id: this.userId }).subscribe(
      (data) => this.handleServiceData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleUpdatedServiceData(data) {
    this.addMessages("success", "Success", data.message);
    this.getUserServices();
  }
  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
