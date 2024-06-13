/**
 * this is custom message component
 */
import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { OptionInfo } from "src/app/component/componentModel/option-info";
import { MergeSendInfo } from "src/app/models/mergeSend-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-custom-message",
  templateUrl: "./custom-message.component.html",
  styleUrls: ["./custom-message.component.css"],
})
export class CustomMessageComponent implements OnInit {
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  inputInfo: InputInfo[] = [];
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  messageInputInfo: InputInfo[] = [];
  /**
   * radio options to display
   */
  options: OptionInfo[] = [
    {
      key: "test",
      brand: "test",
      value: "billing",
    },
    {
      key: "test2",
      brand: "test2",
      value: "service api",
    },
  ];
  /**
   * this flag is used to check whether the value of input field changed
   */
  changeFlag = false;
  /**
   * this flag is used to check whether the value of input field changed
   */
  updatedFlag = false;
  /**
   * this flag is used to check whether the value of message changed
   */
  messageFlag = false;
  /**
   * counter to check against lenght of input info on Submit
   */
  counterInputs = 0;
  /**
   * set message object
   */
  setMessage = new MergeSendInfo();
  /**
   * radio button data
   */
  radioBtnData: OptionInfo[] = [];
  /**
   * custom message is stored in this variable
   */
  customMessage = new MergeSendInfo();
  /**
   * previously saved custom message
   */
  savedCustomMessage = new MergeSendInfo();
  /**
   * data array
   */
  data: any[] = [{ name: "2728" }, { name: "9292" }];
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
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    this.getSavedCustomMessages();
    this.generateFormData("", this.options, "");
  }
  /**
   * this API call gets our custom messages
   */
  getSavedCustomMessages() {
    // if (this.customMessage.shortCode && this.customMessage.reply) {
    //   let data = new MergeSendInfo();
    //   data.shortCode = this.customMessage.shortCode;
    //   data.reply = this.customMessage.reply;
    // this.Jarwis.getAllCustomMessage().subscribe(
    //   (data) => this.handleCustomMessage(data),
    //   (error) => this.handleError(error)
    // );
    // }
  }
  /**
   * to generate data for our input fields
   * @param shortCode array of short codes to display
   * @param reply array of reply to display
   * @param message default value for message body
   */
  generateFormData(shortCode?, reply?, message?) {
    this.createInput(
      "shortCode",
      "Please select from here",
      "shortCode",
      "string",
      "dropDown",
      "",
      this.data,
      { name: shortCode },
      "",
      [
        {
          type: Validators.required,
          msg: "You must select number",
        },
      ]
    );
    this.createInput(
      "reply",
      "",
      "reply",
      "",
      "radioButton",
      reply,
      "",
      reply,
      "",
      [
        {
          type: Validators.required,
          msg: "You must select Payment Method",
        },
      ]
    );
    this.createInput(
      "message",
      "Please enter the body of your message here",
      "message",
      "string",
      "textArea",
      "",
      "",
      message,
      message,
      [
        {
          type: Validators.required,
          msg: "Message body cannot be empty",
        },
      ]
    );
  }
  /**
   * our function that creates data required for our inputs in an inputinfo type array
   * @param label is the label of the input field
   * @param placeHolder is the placeholder of the input field
   * @param modelName is the model name for the data to be stored
   * @param inputType is input type of any specific i.e sttring,number,date etc
   * @param type is flag to differentiate between different input types
   * @param option is a variable to send data to our input field to dislpay (for dropsdowns and multiselect etc)
   * @param messageBody defaul valur for message body
   * @param val to stored default value of any input field if any
   * @param data is a variable to send data to our input field to dislpay (for dropsdowns and multiselect etc)
   * @param validatorsInfo validation errors and function required for our form
   * @param flag optional flag to switch between arrays to store data
   */
  createInput(
    label,
    placeHolder,
    modelName,
    inputType,
    type,
    option,
    data,
    val,
    messageBody,
    validatorsInfo,
    flag?
  ) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.placeHolder = placeHolder;
    inputObj.modelName = modelName;
    inputObj.inputType = inputType;
    inputObj.type = type;
    inputObj.option = option;
    inputObj.data = data;
    inputObj.val = val;
    inputObj.messageBody = messageBody;
    inputObj.validatorsInfo = validatorsInfo;
    if (flag == true) {
      this.messageInputInfo.push(inputObj);
    } else if (!flag) {
      this.inputInfo.push(inputObj);
    }
  }
  /**
   *our function that is called by our inputs for further data handling
   * @param value contains the data/value provided by the user via our inouts
   * @param modelName name of the model variable for the data to be stored in
   */
  updateData(value, label) {
    this.customMessage[label] = value;
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleCustomMessage(data) {
    this.savedCustomMessage = data.messageData;
    this.updatedFlag = !this.updatedFlag;
    this.inputInfo[2].val = this.savedCustomMessage.message;
    if (this.savedCustomMessage.id) {
      this.customMessage.id = this.savedCustomMessage.id;
    }
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
    this.Jarwis.customMessage(this.customMessage).subscribe(
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
    setTimeout(() => {
      window.location.reload();
    }, 1000);
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
   *our function to Call API to get custom messages according to given shortcode and reply
   */
  getCustomMessage() {
    if (this.customMessage.shortCode && this.customMessage.reply) {
      let Obj = new MergeSendInfo();
      Obj.shortCode = this.customMessage.shortCode;
      Obj.reply = this.customMessage.reply;
      this.Jarwis.getCustomMessage(Obj).subscribe(
        (data) => this.handleCustomMessage(data),
        (error) => this.handleError(error)
      );
    }
  }
}
