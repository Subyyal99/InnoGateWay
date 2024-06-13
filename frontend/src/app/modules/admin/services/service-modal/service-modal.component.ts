import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { ClientInfo } from "src/app/models/client-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-service-modal",
  templateUrl: "./service-modal.component.html",
  styleUrls: ["./service-modal.component.css"],
})
export class ServiceModalComponent implements OnInit {
  /**
   * name variable that we receive from our parent component
   */
  @Input() name: string;
  /**
   * user id we get from our parent component
   */
  @Input() userId: number;
  /**
   * closed event emitter we sendd to parent class
   */
  @Output() closed = new EventEmitter();
  /**
   * to show modal
   */
  visible = true;
  /**
   * This is an initialization of an empty array of the type InputInfo
   */
  inputInfo: InputInfo[] = [];
  /**
   * This is an initialization of an empty array of the type InputInfo
   */
  serviceInputInfo: InputInfo[] = [];
  /**
   * This is a flag to check whether the data coming from the child class has any error or not.
   */
  counterInputs = 0;
  /**
   * this flag is used to check whether the value of input field changed
   */
  changeFlag = false;
  /**
   * this flag is used to check whether the value of input field is updated
   */
  updateFlag = false;
  /**
   *array to store short codes
   */
  shortCodes: any[];
  /**
   * array to store list of countries
   */
  country: any[];
  /**
   * array to store list of services
   */
  services: any[];
  /**
   * object to store our pages final data
   */
  public ClientInfo = new ClientInfo();
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
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    this.getAllData();
  }
  /**
   * our function to call the API to get templates
   */
  getAllData() {
    this.Jarwis.getServices().subscribe(
      (data) => this.handleServicesData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleServicesData(data) {
    this.services = data.data;
    this.Jarwis.getShortCodes().subscribe(
      (data) => this.handleShortCodeData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleShortCodeData(data) {
    if (data.data) {
      this.shortCodes = data.data;
      this.shortCodes.map((item) => {
        item.name = item.shortCode;
      });
    }

    if (this.services.length > 0) {
      this.generateServiceDropDown("services");
    }
  }
  /**
   * this generates service drop down
   * @param flag determines in which array to push data
   */
  generateServiceDropDown(flag?) {
    if (flag) {
      this.createInput(
        "services",
        "services",
        "string",
        "multiSelect",
        "Please select short codes from here",
        this.services,
        this.services && this.services.length > 3
          ? "200px"
          : this.services.length * 50 + "px",
        [],
        flag
      );
    }
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
   * @param flag insturcts the function in which array to push the data
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
      this.serviceInputInfo.push(inputObj);
    } else {
      this.inputInfo.push(inputObj);
    }
  }
  /**
   * This function updates the data on the login page if any change is made
   *
   * @param value This is the new value provided by the user
   * @param label This is the variable that passes along the value
   * @param flag tells the function whether to reset the value or not
   */
  updateData(value, label, flag) {
    if (
      label == "services" &&
      value &&
      (value.name == "SMS Plus" || value.name == "Televoting")
    ) {
      if (!flag) {
        this.ClientInfo = new ClientInfo();
      }
      this.generateFormData(true);
    } else if (
      label == "services" &&
      value &&
      (value.name != "SMS Plus" || value.name != "Televoting")
    ) {
      if (!flag) {
        this.ClientInfo = new ClientInfo();
      }
      this.generateFormData();
    }
    this.ClientInfo[label] = value;
  }
  /**
   * this function generated our input fields and their corresponding data
   * @param flag flag tells the function which input fields to generate
   */
  generateFormData(flag?) {
    this.inputInfo = [];
    if (flag) {
      this.createInput(
        "shortCodes",
        "shortCode",
        "string",
        "multiSelect",
        "Please select short codes from here",
        this.shortCodes,
        this.shortCodes && this.shortCodes.length > 3
          ? "200px"
          : this.shortCodes.length * 50 + "px",
        []
      );
      this.createInput(
        "Country",
        "country",
        "string",
        "text2",
        "Enter country name",
        "",
        "",
        []
      );
    } else {
      this.createInput(
        "No.OfMessageAllowed",
        "noOfMessageAllowed",
        "number",
        "text2",
        "Enter number of allowed messages",
        "",
        "",
        []
      );
      this.createInput(
        "No.OfDaysAllowed",
        "expireAfter",
        "number",
        "text2",
        "Enter number of days allowed",
        "",
        "",
        []
      );
      this.createInput(
        "shortCodes",
        "shortCode",
        "string",
        "multiSelect",
        "Please select short codes from here",
        this.shortCodes,
        this.shortCodes && this.shortCodes.length > 3
          ? "200px"
          : this.shortCodes.length * 50 + "px",
        []
      );
      this.createInput(
        "Country",
        "country",
        "string",
        "text2",
        "Enter country name",
        "",
        "",
        []
      );
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
    this.updateFlag = true;
    this.counterInputs++;
    if (this.counterInputs < this.inputInfo.length) {
      return;
    }
    let errorFlag = this.inputInfo.find((item) => item.errorFlag == true);
    if (errorFlag) {
      return;
    }
    if (!this.ClientInfo.services) {
      this.addMessages("error", "Error", "Please select service");

      return;
    }
    if (
      this.ClientInfo.services["name"] !== "SMS Plus" &&
      this.ClientInfo.services["name"] !== "Televoting" &&
      !this.ClientInfo.noOfMessageAllowed
    ) {
      this.addMessages(
        "error",
        "Error",
        "Please enter number Of Message Allowed"
      );

      return;
    }

    if (
      this.ClientInfo.services["name"] != "SMS Plus" &&
      this.ClientInfo.services["name"] !== "Televoting" &&
      !this.ClientInfo.expireAfter
    ) {
      this.addMessages("error", "Error", "Please enter number Of Days Allowed");

      return;
    }
    if (!this.ClientInfo.shortCode) {
      this.addMessages("error", "Error", "Please select short code");

      return;
    }
    if (!this.ClientInfo.country) {
      this.addMessages("error", "Error", "Please enter country");

      return;
    }
    this.addMessages("info", "Info", "Please Wait...");
    this.ClientInfo.userId = this.userId;
    this.Jarwis.addUserServices(this.ClientInfo).subscribe(
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
    this.addMessages(
      "error",
      "Error",
      error.error.message ? error.error.message : error.message
    );
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
   * function to close modal and send an output call
   */
  closeModel() {
    this.visible = false;
    this.closed.emit();
  }
}
