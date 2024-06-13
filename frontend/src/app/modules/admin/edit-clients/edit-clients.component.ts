import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { LoginInfo } from "src/app/models/login-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-edit-clients",
  templateUrl: "./edit-clients.component.html",
  styleUrls: ["./edit-clients.component.css"],
})
export class EditClientsComponent implements OnInit {
  /**
   * This is an initialization of an empty array of the type InputInfo
   */
  inputInfo: InputInfo[] = [];
  /**
   * This is a flag to check whether the data coming from the child class has any error or not.
   */
  counterInputs = 0;
  /**
   * user id we get from our parent component
   */
  userId: number;
  /**
   * this flag is used to check whether the value of input field changed
   */
  changeFlag = false;
  /**
   * array to store shortcodes
   */
  shortCodes: any[];
  /**
   * array to store services
   */
  services: any[];
  /**
   * object to store client data
   */
  public ClientInfo = new LoginInfo();
  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param Jarwis This connects Backend with Frontend
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param messageService is a message type variable created to display messages in our component
   * @param activatedRoute is a router type variable created to use router functions to navigate within our project
   *
   */
  constructor(
    private router: Router,
    private messageService: MessageService,
    private Jarwis: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.ClientInfo.id = queryParams.id;
      this.Jarwis.getClientInfo({ userId: this.ClientInfo.id }).subscribe(
        (data) => this.handleUserData(data),
        (error) => this.handleError(error)
      );
    });
  }
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {}
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleUserData(data) {
    this.generateFormData(data.data[0]);
  }
  /**
   * this function generated our input fields and their corresponding data
   * @param data user data to set as default value of input fields
   */
  generateFormData(data) {
    this.createInput(
      "firstName",
      "firstName",
      "name",
      "text2",
      "First Name",
      "",
      data.firstName,
      [
        {
          type: Validators.required,
          msg: "You must enter your First Name",
        },
      ]
    );

    this.createInput(
      "lastName",
      "lastName",
      "name",
      "text2",
      "Last Name",
      "",
      data.lastName,
      [
        {
          type: Validators.required,
          msg: "You must enter your Last Name",
        },
      ]
    );

    this.createInput(
      "email",
      "email",
      "email",
      "text2",
      "Email",
      "",
      data.email,
      [
        {
          type: Validators.email,
          msg: "You must enter valid Email Address",
        },
        {
          type: Validators.required,
          msg: "You must enter your Email Address",
        },
      ]
    );
    this.createInput(
      "newPassword",
      "password",
      "password",
      "text2",
      "Password",
      "",
      "",
      [
        {
          type: Validators.minLength(6),
          name: "minlength",
          msg: "You must enter Password with length more than 6",
        },
      ]
    );
    this.createInput(
      "confirmPassword",
      "confirmPassword",
      "password",
      "text2",
      "ConfirmPassword",
      "",
      "",
      [
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
   * @param modelName it contains name of the model variable for the data to be stored in
   * @param inputType This tells us the context of the content i.e email, password etc
   * @param type This tells us the type of input i.e text, number, symbols etc
   * @param placeHolder place holder to display in our input
   * @param data data required to display by our input
   * @param validatorsInfo This is an object of a model which contains validators type and message
   * @param val default valu of any input field
   */
  createInput(
    label,
    modelName,
    inputType,
    type,
    placeHolder,
    data,
    val,
    validatorsInfo
  ) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.modelName = modelName;
    inputObj.inputType = inputType;
    inputObj.type = type;
    inputObj.placeHolder = placeHolder;
    inputObj.data = data;
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
    this.ClientInfo[label] = value;
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
    if (this.ClientInfo.password != this.ClientInfo.confirmPassword) {
      this.addMessages("error", "Error", "password must be same");
      return;
    }
    this.Jarwis.updateClient(this.ClientInfo).subscribe(
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
}
