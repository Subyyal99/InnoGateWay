/**
 * this is SMSC modal component
 */
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { ClientInfo } from "src/app/models/client-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-smsc-modal",
  templateUrl: "./smsc-modal.component.html",
  styleUrls: ["./smsc-modal.component.css"],
})
export class SmscModalComponent implements OnInit {
  /**
   * name of modal
   */
  @Input() name: string;
  /**
   * user id
   */
  @Input() userId: number;
  /**
   * modal close call
   */
  @Output() closed = new EventEmitter();
  /**
   * modal visibility
   */
  visible = true;
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  inputInfo: InputInfo[] = [];
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  smscInputInfo: InputInfo[] = [];
  /**
   * counter to check against lenght of input info on Submit
   */
  counterInputs = 0;
  /**
   * this flag is used to check whether the value of input field changed
   */
  changeFlag = false;
  /**
   * this flag is used to check whether the value of input field updated
   */
  updateFlag = false;
  /**
   * array to store short codes
   */
  shortCodes: any[];
  /**
   * array to store country names
   */
  country: any[];
  /**
   * array to store SMSCs
   */
  smscs: any[];
  /**
   *object to store admin data
   */
  public adminInfo = new ClientInfo();
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
   * ngOnInIt is an angular lifecycle function that run when we load our component or application and call the function to get all data
   */
  ngOnInit(): void {
    this.getAllData();
  }
  /**
   * our function to call the API to get SMSC data
   */
  getAllData() {
    this.Jarwis.getSmscs().subscribe(
      (data) => this.handleSmscData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleSmscData(data) {
    this.smscs = data.data;
    if (this.smscs.length > 0) {
      this.generateServiceDropDown("services");
    }
  }
  /**
   * this function generated our input fields and their corresponding data
   * @param flag optional flag variable to determine in which array to save data
   */
  generateServiceDropDown(flag?) {
    this.createInput(
      "smsc",
      "smsc",
      "string",
      "multiSelect",
      "Please select short codes from here",
      this.smscs,
      "200px",
      [],
      flag
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
   * @param flag optional flag variable to determine in which array to save data
   */
  createInput(
    label,
    modelName,
    inputType,
    type,
    placeHolder,
    data,
    scrollHeight,
    validatorsInfo,
    flag?
  ) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.modelName = modelName;
    inputObj.inputType = inputType;
    inputObj.type = type;
    inputObj.placeHolder = placeHolder;
    inputObj.data = data;
    inputObj.scrollHeight = scrollHeight;
    inputObj.validatorsInfo = validatorsInfo;
    if (flag == "services") {
      this.smscInputInfo.push(inputObj);
    } else {
      this.inputInfo.push(inputObj);
    }
  }
  /**
   * This function updates the data on the login page if any change is made
   *
   * @param value This is the new value provided by the user
   * @param label This is the variable that passes along the value
   */
  updateData(value, label) {
    this.adminInfo[label] = value;
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
    this.updateFlag = true;
    this.counterInputs++;
    if (this.counterInputs < this.inputInfo.length) {
      return;
    }
    let errorFlag = this.inputInfo.find((item) => item.errorFlag == true);
    if (errorFlag) {
      return;
    }
    if (!this.adminInfo.smsc) {
      this.addMessages("error", "Error", "Please select service");

      return;
    }

    this.addMessages("info", "Info", "Please Wait...");
    this.adminInfo.userId = this.userId;
    this.Jarwis.addAdminSmscs(this.adminInfo).subscribe(
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
    this.closed.emit();
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
    }, 2000);
  }
  /**
   * this function closes our modal and send a call by name of closed
   */
  closeModel() {
    this.visible = false;
    this.closed.emit();
  }
}
