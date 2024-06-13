import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { TableInfo } from "src/app/component/componentModel/table-info";
import { ContactListsInfo } from "src/app/models/contactLists-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  /**
   * header of the table
   */
  tableHeaders = [];
  /**
   * info to display in table
   */
  tableInfo: TableInfo[] = [];
  /**
   * type of search to be performed
   */
  typeFlag: string;
  /**
   * saves the search page data
   */
  public searchInfo = new ContactListsInfo();
  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param Jarwis This connects Backend with Frontend
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param activatedRoute is a activated router type variable created to used to retrieve the data in our url if any
   * @param messageService is a message type variable created to display messages in our component
   */
  constructor(
    public activatedRoute: ActivatedRoute,
    private Jarwis: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      let data = JSON.parse(queryParams.data);
      if (!data.id) {
        this.typeFlag = "generalSearch";
      } else if (data.id) {
        this.typeFlag = "searchById";
      }
      this.Jarwis.searchContacts(data).subscribe(
        (data) => this.handleData(data),
        (error) => this.handleError(error)
      );
    });
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleData(data) {
    if (this.typeFlag == "generalSearch") {
      this.tableHeaders = [
        {
          field: "name",
          header: "Name",
          type: "text",
          edit: "false",
        },
        {
          field: "contactList",
          header: "Contact List",
          type: "text",
          edit: "false",
        },
        {
          field: "contactDetails",
          header: "Contact Details",
          type: "text",
          edit: "false",
        },
        {
          field: "action",
          header: "Action",
          type: "editButton",
          edit: "false",
        },
      ];
    } else if (this.typeFlag == "searchById") {
      this.tableHeaders = [
        {
          field: "name",
          header: "Name",
          type: "text",
          edit: "false",
        },
        {
          field: "contactDetails",
          header: "Contact Details",
          type: "text",
          edit: "false",
        },
        {
          field: "action",
          header: "Action",
          type: "editButton",
          edit: "false",
        },
      ];
    }
    data.searchResult.map((data) => {
      let obj = new TableInfo();
      (obj.name = data.name),
        (obj.contactId = data.id),
        (obj.contactList = data.contactGroup.name),
        (obj.contactListId = data.contactGroup.id),
        (obj.contactDetails = data.email
          ? data.phoneNumber + " " + data.email
          : data.phoneNumber);
      this.tableInfo.push(obj);
    });
    // this.tableInfo = data.searchResult;
  }
  /**
   * handle error is our function to handle error given by APi or custom made
   * @param error is the variable through which we recieve the error to display to the user
   */
  handleError(error) {}
  /**
   *
   * @param path is a string type variable of the route to be navigated
   */
  navigate(path) {
    this.router.navigateByUrl("/side-panel/" + path);
  }
  /**
   * our function to call the API on delete
   */
  onDelete(data) {
    this.Jarwis.removeContact({ id: data.contactId }).subscribe(
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
    }, 3000);
  }
}
