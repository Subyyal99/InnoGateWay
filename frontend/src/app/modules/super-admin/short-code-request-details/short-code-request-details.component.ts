import { Component, ElementRef, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { OptionInfo } from "src/app/component/componentModel/option-info";
import { ShortCodeApprovalInfo } from "src/app/models/shortCodeApproval-info";

@Component({
  selector: "app-short-code-request-details",
  templateUrl: "./short-code-request-details.component.html",
  styleUrls: ["./short-code-request-details.component.css"],
})
export class ShortCodeRequestDetailsComponent implements OnInit {
  /**
   * This is an initialization of an empty array of the type InputInfo
   */
  inputInfo: InputInfo[] = [];
  /**
   * This is a flag to check whether the data coming from the child class has any error or not.
   */
  counterInputs = 0;
  /**
   * id of our smsc
   */
  smscId: number;
  /**
   * this flag informs our fields that data is being updated
   */
  changeFlag = false;
  /**
   * This is boolean type flag to check whether the user logged in.
   */
  isLoggedIn = false;
  /**
   * This is the initializationof a public object of the model LoginInfo
   */
  public shortCodeRequestInfo = new ShortCodeApprovalInfo();

  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param elementRef This is used for changing background color
   * @param Jarwis This connects Backend with Frontend
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param tokenStorage is a variable of tokenstorage type provided by angular
   * @param messageService is a message type variable created to display messages in our component
   * @param activatedRoute is a activated router type variable created to used to retrieve the data in our url if any
   */

  constructor(
    private elementRef: ElementRef,
    private Jarwis: AuthService,
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService // private message: NzMessageService // private messageService: MessageService
  ) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.shortCodeRequestInfo.id = queryParams.shortCodeRequestId;
      this.Jarwis.getShortCodeApprovalRequestById({
        id: queryParams.shortCodeRequestId,
      }).subscribe(
        (data) => this.handleSCARData(data),
        (error) => this.handleError(error)
      );
    });
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleSCARData(data) {
    this.generateFormData(data, data.shortCodeRequestData.type);
  }
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit() {}

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
    this.addMessages("info", "Info", "Please Wait...");
    this.Jarwis.updateShortCodeApprovalRequest(
      this.shortCodeRequestInfo
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
    this.router.navigateByUrl("super-admin/short-code-approval-requests");
  }

  /**
   * In case something went wrong with our request this fucntion is called to handle it
   * @param error This is the problem that occured with our request
   * @param type This tells the type of the msg to be shown
   */
  handleError(error) {
    let msg = error.error.message ? error.error.message : error.message;
    this.addMessages("error", "Error", msg);
  }

  /**
   * this function generated our input fields and their corresponding data
   * @param data required data for the input fields
   * @param typeFlag type flag for which type of inputs to load
   */
  generateFormData(info, typeFlag?) {
    this.inputInfo = [];
    let data = info.shortCodeRequestData;
    let smscData = info.smscData;
    this.smscId = data.smscId;
    if (typeFlag == "receiver") {
      this.createInput(
        "msgIdType",
        "string",
        "disabled",
        "Enter Msg Id Type",
        "",
        data.msgIdType,
        []
      );

      this.createInput(
        "receivePort",
        "string",
        "disabled",
        "Enter Receive Port",
        "",
        data.receivePort,
        []
      );

      this.createInput(
        "smscUsername",
        "string",
        "disabled",
        "Enter Smsc Username",
        "",
        data.smscUsername,
        []
      );

      this.createInput(
        "smscPassword",
        "string",
        "disabled",
        "Enter Smsc Password",
        "",
        data.smscPassword,
        []
      );
      this.createInput(
        "systemType",
        "string",
        "disabled",
        "Enter System Type",
        "",
        data.systemType,
        []
      );

      this.createInput(
        "addressRange",
        "string",
        "disabled",
        "Enter Address Range",
        "",
        data.addressRange,
        []
      );

      this.createInput(
        "sourceAddrTon",
        "number",
        "disabled",
        "Enter Source Addr Ton",
        "",
        data.sourceAddrTon,
        []
      );
      this.createInput(
        "sourceAddrNpi",
        "number",
        "disabled",
        "Enter Source Addr Npi",
        "",
        data.sourceAddrNpi,
        []
      );
      this.createInput(
        "destAddrTon",
        "number",
        "disabled",
        "Enter Dest Addr Ton",
        "",
        data.destAddrTon,
        []
      );
      this.createInput(
        "destAddrNpi",
        "number",
        "disabled",
        "Enter Dest Addr Npi",
        "",
        data.destAddrNpi,
        []
      );

      this.createInput(
        "serviceType",
        "number",
        "disabled",
        "Enter Service Type",
        "",
        data.serviceType,
        []
      );

      this.createInput(
        "altCharset",
        "string",
        "disabled",
        "Enter Alt Charset",
        "",
        data.altCharset,
        []
      );

      this.createInput(
        "flowControl",
        "number",
        "disabled",
        "Enter Flow Control",
        "",
        data.flowControl,
        []
      );

      this.createInput(
        "maxPendingSubmits",
        "number",
        "disabled",
        "Enter Max Pending Submits",
        "",
        data.maxPendingSubmits,
        []
      );
      this.createInput(
        "smscId",
        "string",
        "disabled",
        "Enter Smsc Id",
        "",
        smscData.smscId,
        [
          {
            type: Validators.required,
            msg: "You must enter Smsc Id",
          },
        ]
      );
      this.createInput(
        "billingOperator",
        "string",
        "disabled",
        "Enter billing operator",
        "",
        data.billingOperator,
        [
          {
            type: Validators.required,
            msg: "You must enter billing operator",
          },
        ]
      );
      this.createInput(
        "channelName",
        "string",
        "disabled",
        "Enter channel name",
        "",
        data.channel,
        [
          {
            type: Validators.required,
            msg: "You must enter channel name",
          },
        ]
      );
      this.createInput("host", "number", "text2", "Enter Host", "", "", [
        {
          type: Validators.required,
          msg: "You must enter Host",
        },
      ]);

      this.createInput("port", "number", "text2", "Enter Port", "", "", [
        {
          type: Validators.required,
          msg: "You must enter Port",
        },
      ]);

      this.createInput("logFile", "string", "text2", "Enter Log File", "", "", [
        {
          type: Validators.required,
          msg: "You must enter Log File",
        },
      ]);
      this.createInput(
        "reconnectDelay",
        "number",
        "text2",
        "Enter Reconnect Delay",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Reconnect Delay",
          },
        ]
      );
      this.createInput(
        "enquireLinkInterval",
        "number",
        "text2",
        "Enter Enquire Link Interval",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Enquire Link Interval",
          },
        ]
      );
      this.createInput(
        "allowedSmscId",
        "string",
        "text2",
        "Enter Allowed Smsc Id",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Allowed Smsc Id",
          },
        ]
      );
      this.createInput(
        "deniedSmscId",
        "string",
        "text2",
        "Enter Denied Smsc Id",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Denied Smsc Id",
          },
        ]
      );
      this.createInput(
        "throughput",
        "number",
        "text2",
        "Enter Throughput",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Throughput",
          },
        ]
      );
    } else if (typeFlag == "transmitter") {
      this.createInput(
        "msgIdType",
        "string",
        "disabled",
        "Enter Msg Id Type",
        "",
        data.msgIdType,
        []
      );

      this.createInput(
        "receivePort",
        "string",
        "disabled",
        "Enter Receive Port",
        "",
        data.receivePort,
        []
      );
      this.createInput(
        "transceiverMode",
        "string",
        "disabled",
        "Enter Transceiver Mode",
        "",
        data.transceiverMode,
        []
      );
      this.createInput(
        "smscUsername",
        "string",
        "disabled",
        "Enter Smsc Username",
        "",
        data.smscUsername,
        []
      );

      this.createInput(
        "smscPassword",
        "string",
        "disabled",
        "Enter Smsc Password",
        "",
        data.smscPassword,
        []
      );
      this.createInput(
        "systemType",
        "string",
        "disabled",
        "Enter System Type",
        "",
        data.systemType,
        []
      );

      this.createInput(
        "addressRange",
        "string",
        "disabled",
        "Enter Address Range",
        "",
        data.addressRange,
        []
      );

      this.createInput(
        "sourceAddrTon",
        "number",
        "disabled",
        "Enter Source Addr Ton",
        "",
        data.sourceAddrTon,
        []
      );
      this.createInput(
        "sourceAddrNpi",
        "number",
        "disabled",
        "Enter Source Addr Npi",
        "",
        data.sourceAddrNpi,
        []
      );
      this.createInput(
        "destAddrTon",
        "number",
        "disabled",
        "Enter Dest Addr Ton",
        "",
        data.destAddrTon,
        []
      );
      this.createInput(
        "destAddrNpi",
        "number",
        "disabled",
        "Enter Dest Addr Npi",
        "",
        data.destAddrNpi,
        []
      );
      this.createInput(
        "smscId",
        "number",
        "disabled",
        "Enter Smsc Id",
        "",
        data.smscId,
        [
          {
            type: Validators.required,
            msg: "You must enter Smsc Id",
          },
        ]
      );
      this.createInput(
        "billingOperator",
        "string",
        "disabled",
        "Enter billing operator",
        "",
        data.billingOperator,
        [
          {
            type: Validators.required,
            msg: "You must enter billing operator",
          },
        ]
      );
      this.createInput(
        "channelName",
        "string",
        "disabled",
        "Enter channel name",
        "",
        data.channel,
        [
          {
            type: Validators.required,
            msg: "You must enter channel name",
          },
        ]
      );
      this.createInput("host", "number", "text2", "Enter Host", "", "", [
        {
          type: Validators.required,
          msg: "You must enter Host",
        },
      ]);

      this.createInput("port", "number", "text2", "Enter Port", "", "", [
        {
          type: Validators.required,
          msg: "You must enter Port",
        },
      ]);

      this.createInput("logFile", "string", "text2", "Enter Log File", "", "", [
        {
          type: Validators.required,
          msg: "You must enter Log File",
        },
      ]);
      this.createInput(
        "reconnectDelay",
        "number",
        "text2",
        "Enter Reconnect Delay",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Reconnect Delay",
          },
        ]
      );
      this.createInput(
        "enquireLinkInterval",
        "number",
        "text2",
        "Enter Enquire Link Interval",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Enquire Link Interval",
          },
        ]
      );
    } else if (typeFlag == "both") {
      this.createInput(
        "msgIdType",
        "string",
        "disabled",
        "Enter Msg Id Type",
        "",
        data.msgIdType,
        []
      );

      this.createInput(
        "receivePort",
        "string",
        "disabled",
        "Enter Receive Port",
        "",
        data.receivePort,
        []
      );

      this.createInput(
        "smscUsername",
        "string",
        "disabled",
        "Enter Smsc Username",
        "",
        data.smscUsername,
        []
      );

      this.createInput(
        "smscPassword",
        "string",
        "disabled",
        "Enter Smsc Password",
        "",
        data.smscPassword,
        []
      );
      this.createInput(
        "systemType",
        "string",
        "disabled",
        "Enter System Type",
        "",
        data.systemType,
        []
      );

      this.createInput(
        "addressRange",
        "string",
        "disabled",
        "Enter Address Range",
        "",
        data.addressRange,
        []
      );

      this.createInput(
        "sourceAddrTon",
        "number",
        "disabled",
        "Enter Source Addr Ton",
        "",
        data.sourceAddrTon,
        []
      );
      this.createInput(
        "sourceAddrNpi",
        "number",
        "disabled",
        "Enter Source Addr Npi",
        "",
        data.sourceAddrNpi,
        []
      );
      this.createInput(
        "destAddrTon",
        "number",
        "disabled",
        "Enter Dest Addr Ton",
        "",
        data.destAddrTon,
        []
      );
      this.createInput(
        "destAddrNpi",
        "number",
        "disabled",
        "Enter Dest Addr Npi",
        "",
        data.destAddrNpi,
        []
      );

      this.createInput(
        "serviceType",
        "number",
        "disabled",
        "Enter Service Type",
        "",
        data.serviceType,
        []
      );

      this.createInput(
        "altCharset",
        "string",
        "disabled",
        "Enter Alt Charset",
        "",
        data.altCharset,
        []
      );

      this.createInput(
        "flowControl",
        "number",
        "disabled",
        "Enter Flow Control",
        "",
        data.flowControl,
        []
      );

      this.createInput(
        "maxPendingSubmits",
        "number",
        "disabled",
        "Enter Max Pending Submits",
        "",
        data.maxPendingSubmits,
        []
      );

      this.createInput(
        "smscId",
        "number",
        "disabled",
        "Enter Smsc Id",
        "",
        data.smscId,
        [
          {
            type: Validators.required,
            msg: "You must enter Smsc Id",
          },
        ]
      );
      this.createInput(
        "billingOperator",
        "string",
        "disabled",
        "Enter billing operator",
        "",
        data.billingOperator,
        [
          {
            type: Validators.required,
            msg: "You must enter billing operator",
          },
        ]
      );
      this.createInput(
        "channelName",
        "string",
        "disabled",
        "Enter channel name",
        "",
        data.channel,
        [
          {
            type: Validators.required,
            msg: "You must enter channel name",
          },
        ]
      );

      this.createInput("host", "number", "text2", "Enter Host", "", "", [
        {
          type: Validators.required,
          msg: "You must enter Host",
        },
      ]);

      this.createInput("port", "number", "text2", "Enter Port", "", "", [
        {
          type: Validators.required,
          msg: "You must enter Port",
        },
      ]);

      this.createInput("logFile", "string", "text2", "Enter Log File", "", "", [
        {
          type: Validators.required,
          msg: "You must enter Log File",
        },
      ]);
      this.createInput(
        "reconnectDelay",
        "number",
        "text2",
        "Enter Reconnect Delay",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Reconnect Delay",
          },
        ]
      );
      this.createInput(
        "enquireLinkInterval",
        "number",
        "text2",
        "Enter Enquire Link Interval",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Enquire Link Interval",
          },
        ]
      );
      this.createInput(
        "allowedSmscId",
        "string",
        "text2",
        "Enter Allowed Smsc Id",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Allowed Smsc Id",
          },
        ]
      );
      this.createInput(
        "deniedSmscId",
        "string",
        "text2",
        "Enter Denied Smsc Id",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Denied Smsc Id",
          },
        ]
      );
      this.createInput(
        "throughput",
        "number",
        "text2",
        "Enter Throughput",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Throughput",
          },
        ]
      );

      this.createInput("smscId", "number", "text2", "Enter Smsc Id", "", "", [
        {
          type: Validators.required,
          msg: "You must enter Smsc Id",
        },
      ]);

      this.createInput("host", "number", "text2", "Enter Host", "", "", [
        {
          type: Validators.required,
          msg: "You must enter Host",
        },
      ]);

      this.createInput("port", "number", "text2", "Enter Port", "", "", [
        {
          type: Validators.required,
          msg: "You must enter Port",
        },
      ]);

      this.createInput("logFile", "string", "text2", "Enter Log File", "", "", [
        {
          type: Validators.required,
          msg: "You must enter Log File",
        },
      ]);
      this.createInput(
        "reconnectDelay",
        "number",
        "text2",
        "Enter Reconnect Delay",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Reconnect Delay",
          },
        ]
      );
      this.createInput(
        "enquireLinkInterval",
        "number",
        "text2",
        "Enter Enquire Link Interval",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Enquire Link Interval",
          },
        ]
      );
      this.createInput(
        "allowedSmscId",
        "string",
        "text2",
        "Enter Allowed Smsc Id",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Allowed Smsc Id",
          },
        ]
      );
      this.createInput(
        "deniedSmscId",
        "string",
        "text2",
        "Enter Denied Smsc Id",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Denied Smsc Id",
          },
        ]
      );
      this.createInput(
        "throughput",
        "number",
        "text2",
        "Enter Throughput",
        "",
        "",
        [
          {
            type: Validators.required,
            msg: "You must enter Throughput",
          },
        ]
      );
    }
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
    inputType,
    type,
    placeHolder,
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
    inputObj.option = option;
    inputObj.val = val;
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
    this.shortCodeRequestInfo[label] = value;
    if (label == "smscId") {
      this.shortCodeRequestInfo["smscId"] = this.smscId.toString();
    }
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
   * Changes Background color
   */
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "#fff";
  }
}
