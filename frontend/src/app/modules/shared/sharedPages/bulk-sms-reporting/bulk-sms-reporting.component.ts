import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { TableInfo } from "src/app/component/componentModel/table-info";

@Component({
  selector: "app-bulk-sms-reporting",
  templateUrl: "./bulk-sms-reporting.component.html",
  styleUrls: ["./bulk-sms-reporting.component.css"],
})
export class BulkSmsReportingComponent implements OnInit {
  /**
   * headers for our table
   */
  tableHeaders = [
    { field: "dateTime", header: "Date & Time", type: "date", edit: "false" },
    { field: "shortCode", header: "Short Code", type: "text", edit: "false" },
    { field: "msisdn", header: "MSISDN", type: "text", edit: "false" },
    { field: "msgContent", header: "Message", type: "text", edit: "false" },
  ];
  /**
   * array to store data to display in table
   */
  tableInfo = [];
  /**
   * array to save short codes
   */
  shortCodes = [];
  /**
   * service id
   */
  serviceId: string;
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  inputInfo: InputInfo[] = [];
  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param Jarwis This connects Backend with Frontend
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param messageService is a message type variable created to display messages in our component
   *
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
    this.getBulkSms();
  }
  /**
   * API call to get bulk sms
   */
  getBulkSms() {
    this.Jarwis.getBulkSms().subscribe(
      (data) => this.handleSmsData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * return call from our API
   * @param data data retrieved from the API
   */
  handleSmsData(data) {
    let shortCode = 0;
    this.tableInfo = [];
    data.data.forEach((item) => {
      let obj = new TableInfo();
      obj.dateTime = item.createdAt;
      obj.msisdn = "693245";
      obj.msgContent = item.message;
      obj.status = item.status;
      obj.shortCode = item.ShortCode.shortCode;
      if (shortCode != item.ShortCode.shortCode) {
        this.shortCodes.push({
          name: item.ShortCode.shortCode,
          shortCodeId: item.ShortCode.id,
        });
      }
      shortCode = item.ShortCode.shortCode;
      this.tableInfo.push(obj);
    });
    this.generateFormData(this.shortCodes);
  }
  /**
   * this function generated our input fields and their corresponding data
   * @param shortCodes array of short codes to show in drop down
   */
  generateFormData(shortCodes) {
    this.createInput(
      "from",
      "Please select from here",
      "",
      "string",
      "dropDown",
      "",
      "",
      shortCodes,
      shortCodes && shortCodes.length > 3
        ? "200px"
        : shortCodes.length * 50 + "px",
      []
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
   * @param scrollHeight sets the height of dropdown
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
    scrollHeight,
    validatorsInfo
  ) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.placeHolder = placeHolder;
    inputObj.modelName = modelName;
    inputObj.inputType = inputType;
    inputObj.type = type;
    inputObj.details = details;
    inputObj.value = val;
    inputObj.val = val;
    inputObj.data = data;
    inputObj.scrollHeight = scrollHeight;
    inputObj.validatorsInfo = validatorsInfo;
    this.inputInfo.push(inputObj);
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
}
