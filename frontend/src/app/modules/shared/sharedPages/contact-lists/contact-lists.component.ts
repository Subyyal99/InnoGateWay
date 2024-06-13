import { createInput } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { TableInfo } from "src/app/component/componentModel/table-info";
import { ContactListsInfo } from "src/app/models/contactLists-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-contact-lists",
  templateUrl: "./contact-lists.component.html",
  styleUrls: ["./contact-lists.component.css"],
})
export class ContactListsComponent implements OnInit {
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  inputInfo: InputInfo[] = [];
  /**
   * this array contains options for the dropdown to display
   */
  dropdownData = [{ name: "In All Contact Lists" }];
  /**
   * spinner loader flag
   */
  spinnerFlags: string;
  /**
   * this flag is used to check whether the value of input field changed
   */
  changeFlag = false;
  deleteContactListFlag = false;

  /**
   * count of no of contacts
   */
  contactCount: number;
  contactListId: number;
  openedContactGroupId: number;
  /**
   * number type variable for counting inputs
   */
  counterInputs = 0;
  limit = 10;
  contactGroupOffset = 0;
  contactGroupsContactsOffset = 0;
  totalContactListRecords: number;
  totalContactListContactsRecords: number;
  /**
   * header for our table
   */
  tableHeaders = [
    { field: "name", header: "Name", type: "text", edit: "false" },
    {
      field: "phone",
      header: "Contact Details",
      type: "text",
      edit: "false",
    },
    {
      field: "email",
      header: "Email Address",
      type: "email",
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
   * table data array of table info
   */
  tableInfo: TableInfo[] = [];
  /**
   * public object of type Contact List Info
   */
  public contactListsInfo = new ContactListsInfo();
  /**
   * array of contact lists
   */
  public groupContactListsInfo: any[] = [];
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
    this.getContactGroups();
    this.generateFormData();
  }
  /**
   * API call to get group names
   */
  getContactGroups() {
    let data = {
      limit: this.limit,
      offset: this.contactGroupOffset,
    };
    this.Jarwis.getGroupNames(data).subscribe(
      (data) => this.handleContactGroupsData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleContactGroupsData(data) {
    this.groupContactListsInfo = data.contactGroups;
    this.totalContactListRecords = data.contactGroupsCount;
    this.groupContactListsInfo.map((contactList) => {
      let obj = { id: contactList.id, name: contactList.name };
      this.dropdownData.push(obj);
      contactList.deleteFlag = false;
      contactList.name =
        contactList.name +
        " ( " +
        Math.floor(contactList.contactCount / contactList.customFieldsCount) +
        " Contacts )";
    });
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleGroupContactCount(data) {
    this.contactCount = data.counts;
  }
  /**
   * handle error is our function to handle error given by APi or custom made
   * @param error is the variable through which we recieve the error to display to the user
   */
  handleError(error) {
    this.messageService.clear();
    let msg = error.error ? error.error.message : error.message;

    this.addMessages("error", "Error", msg);
  }
  /**
   * this function generated our input fields and their corresponding data
   */
  generateFormData() {
    this.createInput(
      "searchWord",
      "strng",
      "text2",
      "",
      "",
      "Enter Number or Contact Name",
      [
        {
          type: Validators.required,
          msg: "Please enter minimum 2 characters to search",
        },
        {
          type: Validators.minLength(2),
          name: "minlength",
          msg: "Please enter minimum 2 characters to search",
        },
      ]
    );

    // this.createInput(
    //   "Sent From",
    //   "strng",
    //   "text2",
    //   "",
    //   "",
    //   "Use shared numbers",
    //   []
    // );

    this.createInput(
      "contactListName",
      "text",
      "dropDown",
      this.dropdownData[0],
      this.dropdownData,
      "Please select option",
      [
        {
          type: Validators.required,
          msg: "You must enter name",
        },
      ]
    );
  }
  /**
   * This functions takes multiple parameters and save them in an object of inputInfo
   *
   * @param label This is the name of the text boxes
   * @param inputType This tells us the context of the content i.e email, password etc
   * @param type This tells us the type of input i.e text, number, symbols etc
   * @param placeHolder place holder to display in our input
   * @param data data required to display by our input
   * @param validatorsInfo This is an object of a model which contains validators type and message
   * @param val default valu of any input field
   */
  createInput(label, inputType, type, val, data, placeHolder, validatorsInfo) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.inputType = inputType;
    inputObj.type = type;
    inputObj.val = val;
    inputObj.data = data;
    inputObj.placeHolder = placeHolder;
    inputObj.validatorsInfo = validatorsInfo;
    this.inputInfo.push(inputObj);
  }
  /**
   * This function updates the data on the login page if any change is made
   *
   * @param value This is the new value provided by the user
   * @param label This is the variable that passes along the value
   */
  updateData(value, label) {
    this.contactListsInfo[label] = value;
    if (label == "contactListName") {
      this.contactListsInfo[label] = value.name;
      this.contactListsInfo.id = value.id;
    }
  }
  /**
   * this function is called by or input when user submit it then check whether or not is there an error
   */
  preSubmit() {
    this.counterInputs = 0;
    this.changeFlag = !this.changeFlag;
  }
  /**
   * our function that get called when user send the final data
   * @returns an Observable instance that synchronously delivers the values provided as arguments.
   */
  onSubmit() {
    this.counterInputs++;
    if (this.counterInputs < this.inputInfo.length) {
      return;
    }
    let errorFlag = this.inputInfo.find((item) => item.errorFlag == true);
    if (errorFlag) {
      return;
    }
    if (this.contactListsInfo.name == "") {
      this.addMessages("info", "Info", "You must enter name");
      return;
    }
    let data = JSON.stringify(this.contactListsInfo);
    this.router.navigate(["side-panel/search"], {
      queryParams: { data: data },
    });
  }
  /**
   * a function for navigating to create new contact list page
   */
  createNewContactList() {
    this.router.navigateByUrl("/side-panel/create-new-contact-list");
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
  /**
   * a function for navigating to create upload file
   */
  import() {
    this.router.navigateByUrl("/side-panel/upload-file");
  }
  /**
   * This API call returns us with specific contact list by id
   * @param id it is the id of the contact list to be retrieved
   */
  openContactListAccordian(accordian) {
    this.spinnerFlags = "loading";
    this.openedContactGroupId = this.groupContactListsInfo[accordian.index].id;
    this.getGroupContactListById();
    this.getFieldsData();
  }
  getGroupContactListById() {
    let data = {
      id: this.openedContactGroupId,
    };
    this.Jarwis.getGroupContactListById(data).subscribe(
      (data) => this.handleGroupContactListData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleGroupContactListData(data) {
    this.tableInfo = [];
    this.tableHeaders = [];
    for (let info of data.groupContactList) {
      let headerObj = {
        field: info.columnName,
        header: info.name,
        type: "text",
        edit: "false",
        justDelete: "true",
      };
      this.tableHeaders.push(headerObj);
    }
  }
  getFieldsData() {
    let data = {
      id: this.openedContactGroupId,
      limit: this.limit,
      offset: this.contactGroupsContactsOffset,
    };
    this.Jarwis.getFieldsContacts(data).subscribe(
      (data) => this.handleContactsData(data),
      (error) => this.handleError(error)
    );
  }
  handleContactsData(data) {
    this.totalContactListContactsRecords = data.totalRows;
    this.tableInfo = [];
    for (let row of data.rows) {
      let tableObj = new TableInfo();
      for (let contact of row.contacts) {
        row.contactGroup.customContactFields.map((field) => {
          if (field.id == contact.customContactFieldId) {
            tableObj[field.columnName] = contact.value;
          }
        });
      }
      this.tableInfo.push(tableObj);
    }
    this.spinnerFlags = "loaded";
  }
  /**
   * this function clears table data
   */
  clearTableInfo() {
    this.spinnerFlags = "loaded";
    this.tableInfo = [];
  }
  deleteContactList(contactListId) {
    this.Jarwis.removeContactList({ contactListId: contactListId }).subscribe(
      (data) => this.handleRemovedContactListData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleRemovedContactListData(data) {
    this.messageService.clear();
    this.addMessages("success", "Success", data.message);
    this.getContactGroups();
  }
  /**
   * API call to delete data
   * @param data data to be deleted
   */
  onDelete(data) {
    this.Jarwis.removeContact({ id: data.id }).subscribe(
      (data) => this.handleRemovedContactData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleRemovedContactData(data) {
    this.messageService.clear();
    this.addMessages("success", "Success", data.message);
  }
  updateContactGroups(data) {
    this.contactGroupOffset = data.page * 10;
    this.getContactGroups();
  }
  updateContactGroupsContacts(event) {
    this.contactGroupsContactsOffset = event.page * 10;
    this.getFieldsData();
  }
  updatedDialog(cond, contactListId) {
    this.deleteContactListFlag = false;
    if (cond == "yes") {
      this.addMessages("info", "Info", "Please wait...");
      this.deleteContactList(contactListId);
    } else if (cond == "no") {
      this.deleteContactListFlag = false;
    }
  }
}
