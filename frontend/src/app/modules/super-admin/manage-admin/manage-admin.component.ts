import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { TableInfo } from "src/app/component/componentModel/table-info";

@Component({
  selector: "app-manage-admin",
  templateUrl: "./manage-admin.component.html",
  styleUrls: ["./manage-admin.component.css"],
})
export class ManageAdminComponent implements OnInit {
  tableHeaders = [
    {
      field: "name",
      header: "Name",
      type: "text",
      edit: "false",
    },
    {
      field: "email",
      header: "E-mail",
      type: "text",
      edit: "false",
    },
    {
      field: "dateTime",
      header: "Registration Date",
      type: "date",
      edit: "false",
    },
    {
      field: "action",
      header: "Action",
      type: "editButton",
      edit: "false",
    },
  ];
  // tableInfo: TableInfo[] = [];
  tableInfo = [
    // {
    //   dateTime: "2022-02-11 10:29:02",
    //   msisdn: "5146843",
    //   msgContent:
    //     "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient.",
    //   status: "status",
    //   shortCode: "shortCode",
    // },
  ];
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
   * ngOnInIt is an angular lifecycle function that run when we load our component or application and call the function to get all Admins
   */
  ngOnInit(): void {
    this.getAllAdmins();
  }
  /**
   * our function to call the API to get all Admins
   */
  getAllAdmins() {
    this.Jarwis.getAllAdmins().subscribe(
      (data) => this.handleClientData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call and store it in table info to show in our table
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleClientData(data) {
    this.tableInfo = [];
    data.data.forEach((item) => {
      let obj = new TableInfo();
      obj.id = item.id;
      obj.name = item.firstName + " " + item.lastName;
      obj.email = item.email;
      obj.dateTime = item.createdAt;
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
    this.router.navigate(["side-panel/sms-plus/message-detail"], {
      queryParams: { id: id },
    });
  }
  /**
   * our function to call the API on delete
   */
  onDelete(data) {
    this.Jarwis.deleteClient(data).subscribe(
      (data) => this.handleDeletedData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call and store it in table info to show in our table
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleDeletedData(data) {
    this.addMessages("success", "Success", data.message);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  /**
   * this is our function to route the user to a specific page
   * @param path recieves the path for the routing
   * @param id recieves the required id for the routing
   */
  onEdit(path, id) {
    this.router.navigate(["super-admin/" + path], {
      queryParams: { id: id },
    });
  }
}
