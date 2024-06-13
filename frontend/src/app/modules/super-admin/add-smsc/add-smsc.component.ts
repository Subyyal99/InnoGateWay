import { Component, ElementRef, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { SmscInfo } from "src/app/models/addSmsc-info";
/**
 * these are the component selectors of our page
 */
@Component({
  selector: "app-add-smsc",
  templateUrl: "./add-smsc.component.html",
  styleUrls: ["./add-smsc.component.css"],
})
export class AddSmscComponent implements OnInit {
  /**
   * This is an initialization of an empty array of the type InputInfo
   */
  inputInfo: InputInfo[] = [];
  /**
   * This is a flag to check whether the data coming from the child class has any error or not.
   */
  counterInputs = 0;
  /**
   * this is change flag a boolean type flag used to check whether the value of input changes
   */
  changeFlag = false;
  /**
   * This is the initializationof a public object of the model LoginInfo
   */
  public smscInfo = new SmscInfo();

  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param Jarwis This connects Backend with Frontend
   * @param messageService is a message type variable created to display messages in our component
   */
  constructor(
    private Jarwis: AuthService,
    private messageService: MessageService
  ) {}

  /**
   * This runs when module is loaded and checks whether the logged in or not and call generateFormData
   */

  ngOnInit() {
    this.generateFormData();
  }
  /**
   * this life cycle function is called after our page is loaded
   */
  ngAfterViewInit() {}
  /**
   * This function reloads the page after the req is send and process is complete
   */
  reloadPage() {
    window.location.reload();
  }
  /**
   * This function sends the data gained from user to backend
   * @returns
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
    if (errorFlag) {
      return;
    }
    this.Jarwis.addSmsc(this.smscInfo).subscribe(
      (data) => this.handleData(data, "success"),
      (error) => this.handleError(error, "error")
    );
  }
  /**
   * This is a function to handle data coming from backend and has two para meters.It also contains the message of success if it succeeded.
   *
   * It also calls the function to reload page.
   * @param data this is the data coming from backend
   * @param type this is the message parameter
   */
  handleData(data, type) {
    this.messageService.clear();
    this.addMessages("success", "Success", data.message);
    this.generateFormData();
  }
  /**
   * This function add messages to our components
   * @param severity This parameter defines the type or severity of message
   * @param summary This parameter defines the summary of message
   * @param detail This parameter defines the details of message
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
   * In case something went wrong with our request this fucntion is called to handle it
   * @param error This is the problem that occured with our request
   * @param type This tells the type of the msg to be shown
   */
  handleError(error, type) {
    let msg = error.error ? error.error : error.message;
    this.addMessages("error", "Error", msg);
  }

  /**
   * This function validators and error messages for our login information.
   */
  generateFormData() {
    this.inputInfo = [];
    this.createInput(
      "smscName",
      "name",
      "name",
      "text2",
      "Enter smsc name",
      "",
      [
        {
          type: Validators.required,
          msg: "You must enter Smsc Name",
        },
      ]
    );
    this.createInput(
      "smscId",
      "smscId",
      "smscId",
      "text2",
      "Enter smsc id",
      "",
      [
        {
          type: Validators.required,
          msg: "You must enter Smsc Id",
        },
      ]
    );
    this.createInput(
      "countryName",
      "country",
      "name",
      "text2",
      "Enter country name",
      "",
      [
        {
          type: Validators.required,
          msg: "You must enter Country Name",
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
   * @param validatorsInfo This is an object of a model which contains validators type and message
   */
  createInput(
    label,
    modelName,
    inputType,
    type,
    placeHolder,
    data,
    validatorsInfo
  ) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.modelName = modelName;
    inputObj.inputType = inputType;
    inputObj.type = type;
    inputObj.placeHolder = placeHolder;
    inputObj.data = data;
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
    this.smscInfo[label] = value;
  }
}
