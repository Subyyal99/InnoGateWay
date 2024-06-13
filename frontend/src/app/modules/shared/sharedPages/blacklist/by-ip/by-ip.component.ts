import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { TableInfo } from "src/app/component/componentModel/table-info";
import { BlackListInfo } from "src/app/models/blackList-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-by-ip",
  templateUrl: "./by-ip.component.html",
  styleUrls: ["./by-ip.component.css"],
})
export class ByIpComponent implements OnInit {
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  inputInfo: InputInfo[] = [];
  /**
   * number type variable for counting inputs
   */
  counterInputs = 0;
  /**
   * this array save the table data to show
   */
  tableInfo: TableInfo[] = [];
  /**
   * these are the table headers
   */
  tableHeaders = [
    {
      field: "ip",
      header: "Ip",
      type: "text",
      edit: "false",
      justDelete: "true",
    },
    {
      field: "reason",
      header: "Reason ",
      type: "text",
      edit: "false",
      justDelete: "true",
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
   * this flag is used to check whether the value of input field changed
   */
  changeFlag = false;
  /**
   *
   * @param messageService is a message type variable created to display messages in our component
   * @param Jarwis is an angular service type variable used to call APIs required for our application
   */
  constructor(
    private Jarwis: AuthService,
    private messageService: MessageService
  ) {}
  /**
   * this object is used to save data from our page
   */
  blackListInfo = new BlackListInfo();
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    this.generateFormData();
    this.getBlackListedIps();
  }
  /**
   * this function generated our input fields and their corresponding data
   */
  generateFormData() {
    this.createInput("ip", "Enter ip address here", "ip", "text", "text2", [
      {
        type: Validators.required,
        msg: "You must enter Ip address",
      },
    ]);
    this.createInput("reason", "Enter reason here", "reason", "text", "text2", [
      {
        type: Validators.required,
        msg: "You must enter reason",
      },
    ]);
  }
  /**
   * This functions takes multiple parameters and save them in an object of inputInfo
   *
   * @param label This is the name of the text boxes
   * @param modelName it contains name of the model variable for the data to be stored in
   * @param inputType This tells us the context of the content i.e email, password etc
   * @param type This tells us the type of input i.e text, number, symbols etc
   * @param placeHolder place holder to display in our input
   * @param validatorsInfo This is an object of a model which contains validators type and message
   */
  createInput(label, placeHolder, modelName, inputType, type, validatorsInfo) {
    let obj = new InputInfo();
    obj.label = label;
    obj.placeHolder = placeHolder;
    obj.modelName = modelName;
    obj.inputType = inputType;
    obj.type = type;
    obj.validatorsInfo = validatorsInfo;
    this.inputInfo.push(obj);
  }
  /**
   * This function updates the data on the login page if any change is made
   *
   * @param value This is the new value provided by the user
   * @param label This is the variable that passes along the value
   */
  updateData(data, model) {
    this.blackListInfo[model] = data;
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

    this.messageService.clear();
    this.addMessages("info", "Info", "Please Wait...");
    this.Jarwis.blackListIpAddress(this.blackListInfo).subscribe(
      (data) => this.handleData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleData(data) {
    this.messageService.clear();
    this.addMessages("success", "Success", data.message);
    this.getBlackListedIps();
    this.inputInfo = [];
    this.generateFormData();
  }
  /**
   * handle error is our function to handle error given by APi or custom made
   * @param error is the variable through which we recieve the error to display to the user
   */
  handleError(error) {
    this.messageService.clear();
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
    }, 3000);
  }
  /**
   * API call to get blacklisted ips
   */
  getBlackListedIps() {
    this.Jarwis.getBlackListedIps().subscribe(
      (data) => this.handleBlackListedIpsData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleBlackListedIpsData(data) {
    this.tableInfo = [];
    data.data.forEach((item) => {
      let obj = new TableInfo();
      obj.ip = item.ip;
      obj.id = item.id;
      obj.reason = item.reason;
      this.tableInfo.push(obj);
    });
  }
  /**
   *API call to delete data from row
   * @param data data to delete
   */
  onDelete(data) {
    this.Jarwis.removeBlackListedIp({ id: data.id }).subscribe(
      (data) => this.handleRemovedIpData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleRemovedIpData(data) {
    this.messageService.clear();
    this.addMessages("success", "Success", data.message);
    this.getBlackListedIps();
  }
}
