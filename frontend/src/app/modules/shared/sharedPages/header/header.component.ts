import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MenuItem, MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
// import { SocketService } from "src/app/services/socket.service";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { LoginInfo } from "src/app/models/login-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  /**
   * stores any info
   */
  items: any[] = [];
  // adInfo = new AdsInfo();
  // cardInfo: CardInfo[] = [];
  // cardInfoNotification: CardInfo[] = [];
  /**
   * stores user info
   */
  userInfo = new LoginInfo();
  /**
   * notification flag
   */
  showNotification: boolean = false;
  // @Output() profileUrl = new EventEmitter();
  /**
   * login flag
   */
  loginFlag = "false";
  /**
   * modal opener
   */
  modalName = "";
  /**
   * data flag to determine whether there is data or not
   */
  dataFlag = false;
  /**
   * show message flag
   */
  visibleMessage = false;
  /**
   * design flag
   */
  designFlag = false;
  /**
   * request id variable
   */
  requestId: number;
  /**
   * modal type
   */
  modalType: string;

  /**
   * input info
   */
  inputInfo: InputInfo[] = [];
  /**
   * user name string
   */
  user: string;
  @Output() sidepanelBtn = new EventEmitter();

  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param Jarwis This connects Backend with Frontend
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param tokenStorage is a variable of tokenstorage type provided by angular
   * @param messageService is a message type variable created to display messages in our component
   */
  constructor(
    private Jarwis: AuthService,
    private router: Router,
    public tokenStorageService: TokenStorageService,
    private messageService: MessageService
  ) {
    if (this.tokenStorageService.isTokenExpired()) {
    }
  }
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    if (!this.tokenStorageService.isTokenExpired()) {
      //  this.spinner.show();
      this.Jarwis.getHeaderInfo().subscribe(
        (data) => this.handleData(data),
        (error) => this.handleError(error)
      );
      //   //  this.getCounts();
      //   // this.getStudentNotifications();
    }
    this.generateFormData();

    this.items = [
      {
        label: "Phone Number",
      },
      {
        label: "Email Address",
      },
      {
        label: "Given Name",
      },
      {
        label: "Family Name",
      },
      {
        label: "Display Name",
      },
    ];
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleData(data) {
    this.userInfo = data.data;
  }
  /**
   * handle error is our function to handle error given by APi or custom made
   * @param error is the variable through which we recieve the error to display to the user
   */
  handleError(error) {
    this.messageService.clear();
    let msg = error.error
      ? error.error.message
        ? error.error.message
        : error.error
      : error.message;

    this.addMessages("error", "Error", msg);
  }
  /**
   * this function generated our input fields and their corresponding data
   */
  generateFormData() {
    this.createInput(
      "message",
      "Enter the message you would like to send",
      "string",
      "text",
      [
        {
          type: Validators.required,
          msg: "You must enter your message",
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
   * @param placeHolder place holder to display in our input
   * @param validatorsInfo This is an object of a model which contains validators type and message
   */
  createInput(label, placeHolder, inputType, type, validatorsInfo) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.placeHolder = placeHolder;

    inputObj.inputType = inputType;
    inputObj.type = type;
    inputObj.validatorsInfo = validatorsInfo;
    this.inputInfo.push(inputObj);
  }
  /**
   * this function is used for logging out
   */
  logOff() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl("/login");
  }
  test() {}

  help() {}

  settings() {}

  buyNow() {}
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
  test1(){
    this.sidepanelBtn.emit();
  }
}
