import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { TableInfo } from "src/app/component/componentModel/table-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-manage-clients",
  templateUrl: "./manage-clients.component.html",
  styleUrls: ["./manage-clients.component.css"],
})
export class ManageClientsComponent implements OnInit {
  /**
   * header of the table to display
   */
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
  /**
   * variable to store data for table
   */
  tableInfo = [];
  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param Jarwis This connects Backend with Frontend
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param messageService is a message type variable created to display messages in our component
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
    this.getAllClients();
  }
  /**
   * our function to call the API to get all clients
   */
  getAllClients() {
    this.Jarwis.getAllClients().subscribe(
      (data) => this.handleClientData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
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
   * this function routes us to message details page
   * @param id id of the message whose details are required
   */
  getDetails(id) {
    this.router.navigate(["side-panel/sms-plus/message-detail"], {
      queryParams: { id: id },
    });
  }

  /**
   *  our function to call the API to delete client
   * @param data client info to delete
   */
  onDelete(data) {
    this.Jarwis.deleteClient(data).subscribe(
      (data) => this.handleDeletedData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleDeletedData(data) {
    this.addMessages("success", "Success", data.message);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  /**
   * this function routes us to desired path
   * @param path path to route to
   * @param id id of the client
   */
  onEdit(path, id) {
    this.router.navigate(["admin/" + path], {
      queryParams: { id: id },
    });
  }
}
