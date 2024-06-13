import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { TestAndConfirm } from "src/app/models/testAndConfirm-info";
import { CampaignService } from "src/app/services/campaign.service";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-test-and-confirm",
  templateUrl: "./test-and-confirm.component.html",
  styleUrls: ["./test-and-confirm.component.css"],
})
/**
 * exports class of our component while implementing lifecycle ngoninit
 */
export class TestAndConfirmComponent implements OnInit {
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  inputInfo: InputInfo[] = [];
  /**
   * this flag is used to check whether the value of input field changed
   */
  changeFlag = false;
  /**
   * this variable sstore the complete data of our campaign
   */
  completeData;
  /**
   * this string contains names of the recipients of the campaign messages
   */
  recipients = "";
  /**
   * in this object of type TestAndConfirm we save the data from our component
   */
  public testAndConfirmInfo = new TestAndConfirm();
  /**
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param campaignService is a service variable custom made to save and get campaign data
   * @param activatedRoute is a activated router type variable created to used to retrieve the data in our url if any
   * @param Jarwis is an angular service type variable used to call APIs required for our application
   * @param messageService is a message type variable created to display messages in our component
   */
  constructor(
    private router: Router,
    private campaignService: CampaignService,
    public activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private Jarwis: AuthService
  ) {
    this.completeData = campaignService.getData();
    this.completeData.to.forEach((element) => {
      this.recipients = this.recipients + element + ",";
    });
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.testAndConfirmInfo.id = queryParams.id;
      this.Jarwis.getCampaign({ id: this.testAndConfirmInfo.id }).subscribe(
        (data) => this.handleData(data),
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
  handleData(data) {
    this.generateFormData(data.data);
  }
  /**
   * handle error is our function to handle error given by APi or custom made
   * @param error is the variable through which we recieve the error to display to the user
   */
  handleError(error) {
    this.addMessages("error", "Error", error.message);
  }
  /**
   * this function generated our input fields and their corresponding data
   * @param data message preview data
   */
  generateFormData(data) {
    let msgArray = data.message.split(" ");
    let msgPreview =
      msgArray[0] + " " + msgArray[1] + " " + msgArray[2] + "...";
    this.createInput(
      "campaignName",
      "strng",
      "text2",
      "",
      "Campaign Name",
      [],
      data.campaignName ? data.campaignName : "",
      true
    );

    this.createInput(
      "Sent From",
      "strng",
      "text2",
      "",
      "Use shared numbers",
      [],
      data.from ? data.from : "",
      true
    );

    this.createInput("Recepits", "strng", "text2", "", "1", [], "", true);

    this.createInput(
      "When to send",
      "strng",
      "text2",
      "",
      "ASAP",
      [],
      data.sendType ? data.sendType : "",
      true
    );

    this.createInput(
      "Total Cost",
      "strng",
      "text2",
      "",
      "0.110",
      [
        {
          type: Validators.required,
          msg: "To complete this send,you require an addiional($1.00).Please purchase credit to continue",
        },
      ],
      "",
      true
    );

    this.createInput(
      "Message Preview",
      "strng",
      "text2",
      "",
      "",
      [],
      msgPreview ? msgPreview : "",
      true
    );

    this.createInput(
      "Text Recipients",
      "strng",
      "text2",
      "",
      "",
      [],
      this.recipients,
      true
    );
  }
  /**
   * This functions takes multiple parameters and save them in an object of inputInfo
   *
   * @param label This is the name of the text boxes
   * @param inputType This tells us the context of the content i.e email, password etc
   * @param type This tells us the type of input i.e text, number, symbols etc
   * @param placeHolder place holder to display in our input
   * @param details data to display by our input
   * @param disabled to determine whether an input is disabled or not
   * @param validatorsInfo This is an object of a model which contains validators type and message
   * @param val default value of input field
   */
  createInput(
    label,
    inputType,
    type,
    details,
    placeHolder,
    validatorsInfo,
    val,
    disabled
  ) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.inputType = inputType;
    inputObj.type = type;
    inputObj.details = details;
    inputObj.placeHolder = placeHolder;
    inputObj.validatorsInfo = validatorsInfo;
    inputObj.val = val;
    inputObj.disabled = disabled;
    this.inputInfo.push(inputObj);
  }
  /**
   * This function updates the data on the login page if any change is made
   *
   * @param value This is the new value provided by the user
   * @param label This is the variable that passes along the value
   */
  updateData(value, label) {
    this.testAndConfirmInfo[label] = value;
  }
  /**
   * this is to restrict our input via index
   * @param num number type variable
   * @param con number type variable
   * @returns returns the result of lessThan operation between num and con
   */
  lessThan(num, con) {
    return num < con;
  }
  /**
   * to navigate to other/previous pages
   * @param type path of the component to navigate to
   */
  back(type) {
    if (type != "create-campaign") {
      this.router.navigate(["/side-panel/" + type], {
        queryParams: { id: this.testAndConfirmInfo.id },
      });
    } else {
      this.router.navigateByUrl("/side-panel/" + type);
    }
  }
  /**
   * our function to call the API to send data as the campaign is finished
   */
  finish() {
    this.testAndConfirmInfo.status = "Completed";
    this.Jarwis.sendCampaignData({ id: this.testAndConfirmInfo.id }).subscribe(
      (data) => this.handleFinalData(data, "create-campaign"),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   * @param type to navigate to specific page after data retrival
   */
  handleFinalData(data, type) {
    this.addMessages("success", "Success", data.message);
    // this.router.navigateByUrl("/side-panel/" + type);
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
