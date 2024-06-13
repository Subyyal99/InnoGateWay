import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { TableInfo } from "src/app/component/componentModel/table-info";
import { UploadFileInfo } from "src/app/component/componentModel/uploadFile-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-spreadsheet-details",
  templateUrl: "./spreadsheet-details.component.html",
  styleUrls: ["./spreadsheet-details.component.css"],
})
export class SpreadsheetDetailsComponent implements OnInit {
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  inputInfo: InputInfo[] = [];
  /**
   * header for our table
   */
  tableHeaders = [
    {
      field: "phoneNumber",
      header: "Mobile Number",
      type: "text",
      edit: "false",
      justDelete: "true",
    },
    {
      field: "name",
      header: "Given Name",
      type: "text",
      edit: "false",
      justDelete: "true",
    },
  ];
  /**
   * table data array of table info
   */
  tableInfo: TableInfo;
  /**
   * this flag is used to check whether the value of input field changed
   */
  changeFlag = false;
  /**
   * number type variable for counting inputs
   */
  counterInputs = 0;
  /**
   * array to store contact groups
   */
  data = [{ name: "(Not Included)" }];
  /**
   * spread sheet data is stored and send via this variable
   */
  spreadSheetDetailsInfo = new UploadFileInfo();
  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param Jarwis This connects Backend with Frontend
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param messageService is a message type variable created to display messages in our component
   * @param tokenStorage is used to access tokenstorageservice
   * @param activatedRoute is a router type variable created to use router functions to navigate within our project
   *
   */
  constructor(
    private router: Router,
    private messageService: MessageService,
    public activatedRoute: ActivatedRoute,
    private Jarwis: AuthService,
    private tokenStorage: TokenStorageService
  ) {}
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.spreadSheetDetailsInfo.contactGroupId = queryParams.id;
      this.spreadSheetDetailsInfo.file = this.tokenStorage.getFile();
      this.getContactGroupFields(this.spreadSheetDetailsInfo.contactGroupId);
    });
  }
  getContactGroupFields(contactGroupId) {
    this.Jarwis.getContactGroupFields({
      contactGroupId: contactGroupId,
    }).subscribe(
      (data) => this.handleContactGroupFieldsData(data),
      (error) => this.handleError(error)
    );
  }
  handleContactGroupFieldsData(data) {
    this.tableHeaders = [];
    for (let info of data.data) {
      let headerObj = {
        field: info.columnName,
        header: info.name,
        type: "text",
        edit: "false",
        justDelete: "true",
      };
      this.tableHeaders.push(headerObj);
    }
    this.getFileData();
  }
  getFileData() {
    this.Jarwis.getfileData(this.spreadSheetDetailsInfo).subscribe(
      (data) => this.handleContactData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleContactData(data) {
    // this.addMessages("success", "Success", data.msg);
    if (data.contacts[0].phoneNumber) {
      this.data = [{ name: "(Not Included)" }, { name: "contacts" }];
      // let headingObj = {
      //   field: "phoneNumber",
      //   header: "Mobile Number",
      //   type: "text",
      //   edit: "false",
      //   justDelete: "true",
      // };
      // this.tableHeaders.push(headingObj);
    }
    if (data.contacts[0].name) {
      this.data = [
        { name: "(Not Included)" },
        { name: "contacts" },
        { name: "name" },
      ];
      // let headingObj = {
      //   field: "name",
      //   header: "Given Name",
      //   type: "text",
      //   edit: "false",
      //   justDelete: "true",
      // };
      // this.tableHeaders.push(headingObj);
    }
    if (data.contacts[0].email) {
      this.data = [
        { name: "(Not Included)" },
        { name: "contacts" },
        { name: "name" },
        { name: "email" },
      ];
      // let headingObj = {
      //   field: "email",
      //   header: "Email",
      //   type: "text",
      //   edit: "false",
      //   justDelete: "true",
      // };
      // this.tableHeaders.push(headingObj);
    }

    this.tableInfo = data.contacts;
    // this.generateFields(data.contacts);
  }
  /**
   * this function generated our input fields and their corresponding data
   * @param data contact data for input fields
   */
  generateFields(data) {
    this.createInput(
      "Mobile Number",
      "",
      "phoneNumber",
      "string",
      "dropDown",
      "",
      { name: data[0].phoneNumber ? this.data[1].name : this.data[0].name },
      this.data,
      [
        {
          type: Validators.required,
          msg: "You must select number",
        },
      ]
    );
    this.createInput(
      "Given Name(s)",
      "",
      "name",
      "string",
      "dropDown",
      "",
      { name: data[0].name ? this.data[2].name : this.data[0].name },
      this.data,
      [
        {
          type: Validators.required,
          msg: "You must select number",
        },
      ]
    );
    this.createInput(
      "Email",
      "",
      "from",
      "string",
      "dropDown",
      "",
      { name: data[0].email ? this.data[3].name : this.data[0].name },
      this.data,
      [
        {
          type: Validators.required,
          msg: "You must select number",
        },
      ]
    );
  }
  /**
   * This functions takes multiple parameters and save them in an object of inputInfo
   *
   * @param label This is the name of the text boxes
   * @param modelName it contains name of the model variable for the data to be stored in
   * @param inputType This tells us the context of the content i.e email, password etc
   * @param type This tells us the type of input i.e text, number, symbols etc
   * @param placeHolder place holder to display in our input
   * @param data data required to display by our input
   * @param validatorsInfo This is an object of a model which contains validators type and message
   * @param details data to show around input fields
   * @param val default valu of any input field
   */
  createInput(
    label,
    placeHolder,
    modelName,
    inputType,
    type,
    details,
    val,
    data,
    validatorsInfo
  ) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.modelName = modelName;
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
    this.spreadSheetDetailsInfo[label] = value;
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
    // this.counterInputs++;
    // if (this.counterInputs < this.inputInfo.length) {
    //   return;
    // }
    // let errorFlag = this.inputInfo.find((item) => item.errorFlag == true);
    // if (errorFlag) {
    //   return;
    // }

    // this.messageService.clear();
    // var formData: FormData = new FormData();

    this.addMessages("info", "Info", "Please wait...");
    this.Jarwis.importContacts(this.spreadSheetDetailsInfo).subscribe(
      (data) => this.handleData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleData(data) {
    this.addMessages("success", "Success", data.message);
    this.router.navigateByUrl("side-panel/contact-lists");
  }
  /**
   * handle error is our function to handle error given by APi or custom made
   * @param error is the variable through which we recieve the error to display to the user
   */
  handleError(error) {
    let msg = error.error ? error.error.message : error.message;

    this.addMessages("error", "Error", msg);
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
   * this function is for routing to upload file page
   */
  back() {
    this.router.navigateByUrl("side-panel/upload-file");
  }
}
