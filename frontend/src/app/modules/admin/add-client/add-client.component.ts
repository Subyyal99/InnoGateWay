import { Component, ElementRef, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { LoginInfo } from "src/app/models/login-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"],
})
export class AddClientComponent implements OnInit {
  /**
   * This is an initialization of an empty array of the type InputInfo
   */
  inputInfo: InputInfo[] = [];
  /**
   * This is a flag to check whether the data coming from the child class has any error or not.
   */
  counterInputs = 0;
  changeFlag = false;
  /**
   * This is boolean type flag to check whether the user logged in.
   */
  isLoggedIn = false;
  /**
   * This is the initializationof a public object of the model LoginInfo
   */
  public loginInfo = new LoginInfo();

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
    private router: Router,
    private messageService: MessageService,
    private tokenStorage: TokenStorageService // private message: NzMessageService // private messageService: MessageService
  ) {}

  /**
   * This runs when module is loaded and checks whether the logged in or not and call generateFormData
   */

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.generateFormData();
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
    this.Jarwis.signUp(this.loginInfo).subscribe(
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

    // this.tokenStorage.saveToken(data.accessToken);
    // this.tokenStorage.saveEmail(data.email);
    // this.isLoggedIn = true;
    this.addMessages("success", "Success", data.message);
    // this.router.navigateByUrl("/login");

    this.reloadPage();
  }
  /**
   * This function add messages to our components
   * @param severity This parameter defines the type or severity of message
   * @param summary This parameter defines the summary of message
   * @param detail This parameter defines the details of message
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
   * In case something went wrong with our request this fucntion is called to handle it
   * @param error This is the problem that occured with our request
   * @param type This tells the type of the msg to be shown
   */
  handleError(error, type) {
    this.messageService.clear();
    let msg = error.error ? error.error : error.message;

    this.addMessages("error", "Error", msg);
  }

  /**
   * This function validators and error messages for our login information.
   */
  generateFormData() {
    this.createInput("firstName", "name", "text2", "First Name", "", [
      {
        type: Validators.required,
        msg: "You must enter your First Name",
      },
      // {
      //   type: Validators.email,
      //   msg: "You must enter valid Email Address",
      // },
    ]);

    this.createInput("lastName", "name", "text2", "Last Name", "", [
      {
        type: Validators.required,
        msg: "You must enter your Last Name",
      },
    ]);

    this.createInput("email", "email", "text2", "Email", "", [
      {
        type: Validators.required,
        msg: "You must enter your Email Address",
      },
      {
        type: Validators.email,
        msg: "You must enter valid Email Address",
      },
    ]);
    this.createInput("password", "password", "text2", "Password", "", [
      {
        type: Validators.required,
        msg: "You must enter your Password",
      },
      {
        type: Validators.minLength(6),
        name: "minlength",
        msg: "You must enter Password with length more than 6",
      },
    ]);
    this.createInput(
      "confirmPassword",
      "password",
      "text2",
      "ConfirmPassword",
      "",
      [
        {
          type: Validators.required,
          msg: "You must enter your Password",
        },
        {
          type: Validators.minLength(6),
          name: "minlength",
          msg: "You must enter Password with length more than 6",
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
  createInput(label, inputType, type, placeHolder, data, validatorsInfo) {
    let inputObj = new InputInfo();
    inputObj.label = label;
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
    this.loginInfo[label] = value;
  }
}
