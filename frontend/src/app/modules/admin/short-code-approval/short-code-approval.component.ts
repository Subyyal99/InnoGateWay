import { Component, ElementRef, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { OptionInfo } from "src/app/component/componentModel/option-info";
import { LoginInfo } from "src/app/models/login-info";
import { ShortCodeApprovalInfo } from "src/app/models/shortCodeApproval-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-short-code-approval",
  templateUrl: "./short-code-approval.component.html",
  styleUrls: ["./short-code-approval.component.css"],
})
export class ShortCodeApprovalComponent implements OnInit {
  /**
   * This is an initialization of an empty array of the type InputInfo
   */
  inputInfo: InputInfo[] = [];
  /**
   * input data for radio
   */
  radioInputInfo: InputInfo[] = [];
  /**
   * This is a flag to check whether the data coming from the child class has any error or not.
   */
  counterInputs = 0;
  /** value for radio buttons */
  radioOptions: OptionInfo[] = [
    {
      key: "receiver",
      brand: "receiver",
      value: "Receiver",
    },
    {
      key: "transmitter",
      brand: "transmitter",
      value: "Transmitter",
    },
    {
      key: "both",
      brand: "both",
      value: "Both",
    },
  ];
  /**
   * this flag is used to check whether the value of input field changed
   */
  changeFlag = false;
  /**
   * determines the size of dropdown scroll
   */
  scrollHeight = "false";
  /**
   * determines the size of dropdown scroll
   */
  scrollHeightBO = "100px";
  /**
   * This is boolean type flag to check whether the user logged in.
   */
  isLoggedIn = false;
  /**
   * flag to restrict recreation of our input fields
   */
  submitFlag = false;
  /**
   * array to store SMSCs
   */
  smscs: any[];
  /**
   * array to store billing operators
   */
  billingOperators: any[] = [{ name: "air" }, { name: "inBilling" }];
  /**
   * This is the initializationof a public object of the model LoginInfo
   */
  public shortCodeApprovalInfo = new ShortCodeApprovalInfo();

  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param elementRef This is used for changing background color
   * @param Jarwis This connects Backend with Frontend
   * @param tokenStorage This stores data of the user login
   * @param message This is used to generate message
   */

  constructor(
    private elementRef: ElementRef,
    private Jarwis: AuthService,
    private messageService: MessageService
  ) {}

  /**
   * This runs when module is loaded and checks whether the logged in or not and call generateFormData
   */

  ngOnInit() {
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
    this.scrollHeight =
      this.smscs.length > 3 ? "200px" : this.smscs.length * 50 + "px";
    if (this.smscs.length > 0) {
      this.generateFormData("Receiver");
    }
  }
  /**
   * Changes Background color
   */
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "#fff";
  }
  /**
   * This function reloads the page after the req is send and process is complete
   */
  reloadPage() {
    window.location.reload();
  }
  /**
   * this function is called by or input when user submit it then check whether or not is there an error
   */
  preSubmit() {
    this.counterInputs = 0;
    this.submitFlag = true;
    this.changeFlag = !this.changeFlag;
  }
  /**
   * This function sends the data gained from user to backend
   * @returns
   */
  onSubmit() {
    this.counterInputs++;
    if (this.counterInputs < this.inputInfo.length + 1) {
      return;
    }
    let errorFlag = this.inputInfo.find((item) => item.errorFlag == true);
    if (errorFlag) {
      return;
    }
    if (!this.shortCodeApprovalInfo.type) {
      return;
    }
    this.addMessages("info", "Info", "Please Wait...");
    this.Jarwis.sendShortCodeApprovalRequest(
      this.shortCodeApprovalInfo
    ).subscribe(
      (data) => this.handleData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is a function to handle data coming from backend and has two para meters.It also contains the message of success if it succeeded.
   *
   * It also calls the function to reload page.
   * @param data this is the data coming from backend
   * @param type this is the message parameter
   */
  handleData(data) {
    this.addMessages("success", "Success", data.message);

    this.reloadPage();
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
   */
  handleError(error) {
    let msg = error.error.message ? error.error.message : error.message;
    this.addMessages("error", "Error", msg);
  }

  /**
   * This function validators and error messages for our login information.
   */
  generateFormData(typeFlag?) {
    this.createInput(
      "type",
      "",
      "radioButton",
      "",
      "",
      this.radioOptions,
      this.radioOptions[0],
      [],
      true
    );
    this.inputInfo = [];
    if (typeFlag == "Receiver") {
      this.createInput(
        "msgIdType",
        "string",
        "text2",
        "Enter Msg Id Type",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Msg Id Type",
          },
        ]
      );

      this.createInput(
        "receivePort",
        "string",
        "text2",
        "Enter Receive Port",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Receive Port",
          },
        ]
      );

      this.createInput(
        "smsc",
        "string",
        "multiSelect",
        "Please select smsc from here",
        this.smscs,
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must select smsc",
          },
        ]
      );
      this.createInput(
        "smscUsername",
        "string",
        "text2",
        "Enter Smsc Username",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Smsc Username",
          },
        ]
      );

      this.createInput(
        "smscPassword",
        "string",
        "text2",
        "Enter Smsc Password",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Smsc Password",
          },
        ]
      );
      this.createInput(
        "billingOperator",
        "string",
        "multiSelectBo",
        "Please select smsc from here",
        this.billingOperators,
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must select smsc",
          },
        ]
      );

      this.createInput(
        "channelName",
        "string",
        "text2",
        "Enter Channel Name",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Channel Name",
          },
        ]
      );
      this.createInput(
        "systemType",
        "string",
        "text2",
        "Enter System Type",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter System Type",
          },
        ]
      );

      this.createInput(
        "addressRange",
        "string",
        "text2",
        "Enter Address Range",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Address Range",
          },
        ]
      );

      this.createInput(
        "sourceAddrTon",
        "number",
        "text2",
        "Enter Source Addr Ton",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Source Addr Ton",
          },
        ]
      );
      this.createInput(
        "sourceAddrNpi",
        "number",
        "text2",
        "Enter Source Addr Npi",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Source Addr Npi",
          },
        ]
      );
      this.createInput(
        "destAddrTon",
        "number",
        "text2",
        "Enter Dest Addr Ton",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Dest Addr Ton",
          },
        ]
      );
      this.createInput(
        "destAddrNpi",
        "number",
        "text2",
        "Enter Dest Addr Npi",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Dest Addr Npi",
          },
        ]
      );

      this.createInput(
        "serviceType",
        "number",
        "text2",
        "Enter Service Type",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Service Type",
          },
        ]
      );

      this.createInput(
        "altCharset",
        "string",
        "text2",
        "Enter Alt Charset",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Alt Charset",
          },
        ]
      );

      this.createInput(
        "flowControl",
        "number",
        "text2",
        "Enter Flow Control",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Flow Control",
          },
        ]
      );

      this.createInput(
        "maxPendingSubmits",
        "number",
        "text2",
        "Enter Max Pending Submits",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Max Pending Submits",
          },
        ]
      );
    } else if (typeFlag == "Transmitter") {
      this.createInput(
        "msgIdType",
        "string",
        "text2",
        "Enter Msg Id Type",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Msg Id Type",
          },
        ]
      );

      this.createInput(
        "receivePort",
        "string",
        "text2",
        "Enter Receive Port",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Receive Port ",
          },
        ]
      );
      this.createInput(
        "transceiverMode",
        "string",
        "text2",
        "Enter Transceiver Mode",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Transceiver Mode",
          },
        ]
      );
      this.createInput(
        "smsc",
        "string",
        "multiSelect",
        "Please select smsc from here",
        this.smscs,
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must select smsc",
          },
        ]
      );
      this.createInput(
        "smscUsername",
        "string",
        "text2",
        "Enter Smsc Username",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Smsc Username",
          },
        ]
      );

      this.createInput(
        "smscPassword",
        "string",
        "text2",
        "Enter Smsc Password",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Smsc Password",
          },
        ]
      );
      this.createInput(
        "billingOperator",
        "string",
        "multiSelectBo",
        "Please select smsc from here",
        this.billingOperators,
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must select smsc",
          },
        ]
      );
      this.createInput(
        "channelName",
        "string",
        "text2",
        "Enter Channel Name",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Channel Name",
          },
        ]
      );
      this.createInput(
        "systemType",
        "string",
        "text2",
        "Enter System Type",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter System Type",
          },
        ]
      );

      this.createInput(
        "addressRange",
        "string",
        "text2",
        "Enter Address Range",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Address Range",
          },
        ]
      );

      this.createInput(
        "sourceAddrTon",
        "number",
        "text2",
        "Enter Source Addr Ton",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Source Addr Ton",
          },
        ]
      );
      this.createInput(
        "sourceAddrNpi",
        "number",
        "text2",
        "Enter Source Addr Npi",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Source Addr Npi",
          },
        ]
      );
      this.createInput(
        "destAddrTon",
        "number",
        "text2",
        "Enter Dest Addr Ton",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Dest Addr Ton",
          },
        ]
      );
      this.createInput(
        "destAddrNpi",
        "number",
        "text2",
        "Enter Dest Addr Npi",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Dest Addr Npi",
          },
        ]
      );
    } else if (typeFlag == "Both") {
      this.createInput(
        "msgIdType",
        "string",
        "text2",
        "Enter Msg Id Type",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Msg Id Type",
          },
        ]
      );

      this.createInput(
        "receivePort",
        "string",
        "text2",
        "Enter Receive Port",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Receive Port",
          },
        ]
      );
      this.createInput(
        "transceiverMode",
        "string",
        "text2",
        "Enter Transceiver Mode",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Transceiver Mode",
          },
        ]
      );
      this.createInput(
        "smsc",
        "string",
        "multiSelect",
        "Please select smsc from here",
        this.smscs,
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must select smsc",
          },
        ]
      );
      this.createInput(
        "smscUsername",
        "string",
        "text2",
        "Enter Smsc Username",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Smsc Username",
          },
        ]
      );

      this.createInput(
        "smscPassword",
        "string",
        "text2",
        "Enter Smsc Password",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Smsc Password",
          },
        ]
      );
      this.createInput(
        "billingOperator",
        "string",
        "multiSelectBo",
        "Please select smsc from here",
        this.billingOperators,
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must select smsc",
          },
        ]
      );
      this.createInput(
        "channelName",
        "string",
        "text2",
        "Enter Channel Name",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Channel Name",
          },
        ]
      );
      this.createInput(
        "systemType",
        "string",
        "text2",
        "Enter System Type",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter System Type",
          },
        ]
      );

      this.createInput(
        "addressRange",
        "string",
        "text2",
        "Enter Address Range",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Address Range",
          },
        ]
      );

      this.createInput(
        "sourceAddrTon",
        "number",
        "text2",
        "Enter Source Addr Ton",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Source Addr Ton",
          },
        ]
      );
      this.createInput(
        "sourceAddrNpi",
        "number",
        "text2",
        "Enter Source Addr Npi",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Source Addr Npi",
          },
        ]
      );
      this.createInput(
        "destAddrTon",
        "number",
        "text2",
        "Enter Dest Addr Ton",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Dest Addr Ton",
          },
        ]
      );
      this.createInput(
        "destAddrNpi",
        "number",
        "text2",
        "Enter Dest Addr Npi",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Dest Addr Npi",
          },
        ]
      );

      this.createInput(
        "serviceType",
        "number",
        "text2",
        "Enter Service Type",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Service Type",
          },
        ]
      );

      this.createInput(
        "altCharset",
        "string",
        "text2",
        "Enter Alt Charset",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Alt Charset",
          },
        ]
      );

      this.createInput(
        "flowControl",
        "number",
        "text2",
        "Enter Flow Control",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Flow Control",
          },
        ]
      );

      this.createInput(
        "maxPendingSubmits",
        "number",
        "text2",
        "Enter Max Pending Submits",
        "",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Max Pending Submits",
          },
        ]
      );
    }
  }

  /**
   * This functions takes multiple parameters and save them in an object of inputInfo
   *
   * @param label This is the name of the text boxes
   * @param flag decides in which array data is to be pushed
   * @param inputType This tells us the context of the content i.e email, password etc
   * @param type This tells us the type of input i.e text, number, symbols etc
   * @param placeHolder place holder to display in our input
   * @param data data required to display by our input
   * @param option data to show around input fields
   * @param val default valu of any input field
   */
  createInput(
    label,
    inputType,
    type,
    placeHolder,
    data,
    option,
    val,
    validatorsInfo,
    flag?
  ) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.inputType = inputType;
    inputObj.type = type;
    inputObj.placeHolder = placeHolder;
    inputObj.data = data;
    inputObj.option = option;
    inputObj.val = val;
    inputObj.validatorsInfo = validatorsInfo;
    if (flag == true) {
      this.radioInputInfo.push(inputObj);
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
    if (label == "type") {
      if (!this.submitFlag) {
        this.generateFormData(value);
      }
      this.submitFlag = false;
    }
    this.shortCodeApprovalInfo[label] = value;
  }
}
