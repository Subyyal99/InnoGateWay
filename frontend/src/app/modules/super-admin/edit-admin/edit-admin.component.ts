import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { ClientInfo } from "src/app/models/client-info";
import { LoginInfo } from "src/app/models/login-info";

@Component({
  selector: "app-edit-admin",
  templateUrl: "./edit-admin.component.html",
  styleUrls: ["./edit-admin.component.css"],
})
export class EditAdminComponent implements OnInit {
  inputInfo: InputInfo[] = [];
  counterInputs = 0;
  userId: number;
  changeFlag = false;
  shortCodes: any[];
  services: any[];
  public ClientInfo = new LoginInfo();
  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param Jarwis This connects Backend with Frontend
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param messageService is a message type variable created to display messages in our component
   * @param activatedRoute is a activated router type variable created to used to retrieve the data in our url if any
   */
  constructor(
    private router: Router,
    private messageService: MessageService,
    private Jarwis: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.ClientInfo.id = queryParams.id;
      this.Jarwis.getAdmin({ userId: this.ClientInfo.id }).subscribe(
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
   * This is the function that recieves the data retrieved by the API call and call the function to generate our required input fields
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleUserData(data) {
    this.generateFormData(data.data);
  }
  /**
   * this function generated our input fields and their corresponding data
   * @param data required data for the input fields
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
   * @param val default value given to our input if any
   * @param validatorsInfo This is an object of a model which contains validators type and message
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
   * This is a function to handle data coming from backend and has two para meters.It also contains the message of success if it succeeded.
   *
   * It also calls the function to reload page.
   * @param data this is the data coming from API call
   */
  handleData(data) {
    this.addMessages("success", "Success", data.message);

    this.router.navigateByUrl("super-admin/manage-admin");
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
}
