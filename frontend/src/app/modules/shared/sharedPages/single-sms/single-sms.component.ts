import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { MergeSendInfo } from "src/app/models/mergeSend-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-single-sms",
  templateUrl: "./single-sms.component.html",
  styleUrls: ["./single-sms.component.css"],
})
export class SingleSmsComponent implements OnInit {
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  inputInfo: InputInfo[] = [];
  /**
   * an inputInfo type object in which we store data for our input templates
   */
  templateInputInfo = new InputInfo();
  /**
   * this flag is used to check whether the value of input field changed
   */
  changeFlag = false;
  /**
   * this flag is used open save template modal
   */
  openDialog = false;
  /**
   * number type variable for counting inputs
   */
  counterInputs = 0;
  /**
   * this flag is used to check whether the value of input field changed
   */
  boxData: string = "";
  // previewMessage:
  /**
   * mergeSendInfo type object in which we store our page data
   */
  singleSmsInfo = new MergeSendInfo();
  /**
   * mergeSendInfo type object in which we store our template data
   */
  templateInfo = new MergeSendInfo();
  /**
   * mergeSendInfo type arary in which we store all templates
   */
  allTemplates: MergeSendInfo[] = [];
  /**
   * this string type variable is used to determine whether to use custom message or not
   */
  userFrom: string;
  /**
   * to save the character count of the message string
   */
  characterCount: number;
  /**
   * to save the no of allowed messages across a specific short code
   */
  noOfMessagesAllowed: number;
  /**
   * to save the no of sent messages across a specific short code
   */
  sentMessages: number;
  /**
   * to limit the message body length to 160 only
   */
  count: number = 160;
  /**
   * to save the character count of the message string
   */
  characterCount2: number;
  /**
   * to save the character count of the message string by percentage
   */
  characterCountPercentage: number;
  /**
   * to check the message string length reached required limit
   */
  lengthFlag: boolean;
  /**
   * to save the character count of the message string
   */
  customFlag: boolean = false;
  /**
   *to save no of messages to show in the preview box
   */
  previewMessage = [];
  /**
   * to save the character count of the message string
   */
  options: any[];
  /**
   * to save short codes
   */
  data: any[] = [];
  /**
   * stores template info
   */
  items: MergeSendInfo[] = [];
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
    this.options = [
      { label: "SMS", value: "sms" },
      { label: "MMS", value: "mms" },
    ];

    this.getTemplates();
  }
  /**
   * our function to call the API to get templates
   */
  getTemplates() {
    this.Jarwis.getAllTemplate().subscribe(
      (data) => this.handleAllTemplates(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleAllTemplates(data) {
    this.allTemplates = data.data;
    this.items = [];
    this.allTemplates.map((data) => {
      let obj = new MergeSendInfo();
      obj.id = data.id;
      obj.label = data.name;
      obj.message = data.message;
      obj.from = data.from;
      this.items.push(obj);
    });
    this.Jarwis.getServiceId({ name: "Single Sms" }).subscribe(
      (data) => this.handleServiceData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleServiceData(data) {
    this.singleSmsInfo.serviceId = data.data.id;
    this.Jarwis.getUserShortCodes({ serviceId: data.data.id }).subscribe(
      (data) => this.handleShortCodeData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleShortCodeData(data) {
    data.data.forEach((element) => {
      let obj = { name: element.shortCode, shortCodeId: element.id };
      this.data.push(obj);
    });
    this.generateFormData();
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

    if (!this.singleSmsInfo.from) {
      this.messageService.clear();
      this.addMessages("error", "Error", "Please select sender ...");
      return;
    }
    if (this.noOfMessagesAllowed == 0) {
      this.messageService.clear();
      this.addMessages("error", "Error", "Package has expired");
      return;
    }
    this.messageService.clear();
    this.addMessages("info", "Info", "Please Wait...");
    this.Jarwis.sendMessage(this.singleSmsInfo).subscribe(
      (data) => this.handleData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * this function generated our input fields and their corresponding data
   */
  generateFormData() {
    if (this.data.length > 3) {
      this.createInput(
        "from",
        "Please select from here",
        "",
        "string",
        "dropDown",
        "",
        "",
        this.data,
        "200px",
        [
          {
            type: Validators.required,
            msg: "You must select number",
          },
        ]
      );
    } else {
      this.createInput(
        "from",
        "Please select from here",
        "",
        "string",
        "dropDown",
        "",
        "",
        this.data,
        this.data.length * 50 + "px",
        [
          {
            type: Validators.required,
            msg: "You must select number",
          },
        ]
      );
    }

    // this.createInput(
    //   "",
    //   "Enter your custom word",
    //   "customWords",
    //   "text",
    //   "text2",
    //   "",
    //   "",
    //   "",
    //   []
    // );
    this.createInput(
      "to",
      "Please enter contact number",
      "to",
      "number",
      "text2",
      "",
      "",
      "",
      "",
      [
        {
          type: Validators.required,
          msg: "You must enter contact number",
        },
      ]
    );
    this.createInput(
      "message",
      "Please enter the body of your message here",
      "",
      "string",
      "textArea",
      "",
      "",
      "",
      "",
      [
        {
          type: Validators.required,
          msg: "Message body cannot be empty",
        },
      ]
    );
    // this.createInput(
    //   "scheduleMessage",
    //   "",
    //   "",
    //   "",
    //   "checkBox",
    //   "Schedule this message ",
    //   ["true"],
    //   "",
    //   []
    // );
    // this.createInput(
    //   "addExpiryToMessage",
    //   "",
    //   "",
    //   "",
    //   "checkBox",
    //   "Add expiry to this message ",
    //   ["true"],
    //   "",
    //   []
    // );
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
   * This function updates the data on the login page if any change is made
   *
   * @param value This is the new value provided by the user
   * @param label This is the variable that passes along the value
   */
  updateData(value, label) {
    if (label == "message") {
      this.templateInfo[label] = value;

      // this.WordCounter(value);
      this.previewMessage = value.match(/.{1,160}/g);
      this.characterCount = value.length;
      this.characterCount2 = this.count - 1;
      this.characterCountPercentage = ((value.length % 160) / 160) * 100;

      if (this.previewMessage && this.previewMessage.length == 0) {
        this.lengthFlag = false;
      } else {
        if (this.previewMessage && this.previewMessage.length > 0) {
          this.lengthFlag = true;
        }
      }
    }

    if (label == "from") {
      this.templateInfo[label] = value;
      this.userFrom = value ? value.name : "";
      let obj = {
        shortCodeId: value.shortCodeId,
        serviceId: this.singleSmsInfo.serviceId,
      };
      this.Jarwis.getSmscount(obj).subscribe(
        (data) => this.handleSmsData(data),
        (error) => this.handleError(error)
      );
      if (this.userFrom == "A custom word") {
        this.customFlag = true;
      } else {
        this.customFlag = false;
      }
    }
    this.singleSmsInfo[label] = value;
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleSmsData(data) {
    this.noOfMessagesAllowed = data.allowedMessages;
    this.sentMessages = data.sentMessages;
    if (this.noOfMessagesAllowed == 0) {
      this.addMessages("error", "Error", "Package has expired");
      return;
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
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleData(data) {
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
    this.addMessages("error", "Error", error.error.message);
  }
  box() {
    this.boxData = "";
    setTimeout(() => {
      this.boxData = "this is very good";
    }, 2000);
  }
  /**
   *
   * @param type determines the type of message to be sent
   * not currently using
   */
  messageType(type) {
    this.singleSmsInfo.messageType = type;
  }
  /**
   * this function is used to open our save template modal
   * @returns function call return after giving the error
   */
  createTemplate() {
    if (!this.singleSmsInfo.message) {
      this.addMessages("error", "Error", "Message name cannot be empty");
      return;
    }
    this.templateInputInfo.label = "Template Name*";
    this.templateInputInfo.placeHolder = "Please enter template name";
    this.templateInputInfo.modelName = "templateName";
    this.templateInputInfo.inputType = "string";
    this.templateInputInfo.type = "text2";
    this.templateInputInfo.validatorsInfo = [];
    this.openDialog = !this.openDialog;
  }
  /**
   *
   * @param data this API call saves our template in our database
   * @param modelName this is name of the variable the is to be stored in
   */
  saveTemplate(data, modelName) {
    this.openDialog = false;
    this.templateInfo[modelName] = data;

    this.Jarwis.saveTemplate(this.templateInfo).subscribe(
      (data) => this.handleTemplate(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleTemplate(data) {
    this.addMessages("success", "Success", data.message);
    this.getTemplates();
  }
}
