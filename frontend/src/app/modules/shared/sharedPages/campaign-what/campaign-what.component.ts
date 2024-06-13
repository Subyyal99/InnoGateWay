import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { CampaignWhatInfo } from "src/app/models/campaignWhat-info";
import { MergeSendInfo } from "src/app/models/mergeSend-info";
import { CampaignService } from "src/app/services/campaign.service";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-campaign-what",
  templateUrl: "./campaign-what.component.html",
  styleUrls: ["./campaign-what.component.css"],
})
export class CampaignWhatComponent implements OnInit {
  /**
   * array of message sending type
   */
  items: any[] = [];
  /**
   * an inputInfo type object in which we store data for our input templates
   */
  templateInputInfo = new InputInfo();
  /**
   * flag to open modal
   */
  openDialog = false;
  /**
   * mergeSendInfo type object in which we store our template data
   */
  templateInfo = new MergeSendInfo();
  /**
   * mergeSendInfo type arary in which we store all templates
   */
  allTemplates: MergeSendInfo[] = [];
  /**
   * merge string variable
   */
  mergingValue;
  /**
   * remove string variable
   */
  removingValue;
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  inputInfo: InputInfo[] = [];
  /**
   * to save the character count of the message string by percentage
   */
  characterCountPercentage: number = 0;
  /**
   * flag to determine which step
   */
  stepFlag: string = "step4";
  // campaignId: string;
  /**
   * number type variable for counting inputs
   */
  counterInputs = 0;
  /**
   * this flag is used to check whether the value of input field changed
   */
  changeFlag = false;
  /**
   *saved compaigns i.e if old saved campaign is reopened then its data is loaded in this variable
   */
  public savedCampaignWhatInfo = new CampaignWhatInfo();
  /**
   *campaign who page data is saved in this variable
   */
  public campaignWhatInfo = new CampaignWhatInfo();
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
    public activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private Jarwis: AuthService
  ) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.id) {
        this.campaignWhatInfo.id = queryParams.id;
        this.Jarwis.getCampaign({ id: this.campaignWhatInfo.id }).subscribe(
          (data) => this.handleSavedCampaignData(data),
          (error) => this.handleError(error)
        );
      } else if (!queryParams.id) {
        this.campaignWhatInfo.flag = false;
        this.Jarwis.getAllTemplate().subscribe(
          (data) => this.handleAllTemplates(data),
          (error) => this.handleError(error)
        );
        this.generateFormData(false);
      }
    });
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleSavedCampaignData(data) {
    this.savedCampaignWhatInfo = data.data;
    this.campaignWhatInfo.flag = false;
    this.Jarwis.getAllTemplate().subscribe(
      (data) => this.handleAllTemplates(data),
      (error) => this.handleError(error)
    );
    this.generateFormData(false);
  }
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    this.items = [
      {
        label: "Phone Number",
        command: () => {
          this.inserting("Phone Number");
        },
      },
      // {
      //   label: "Email Address",
      //   command: () => {
      //     this.inserting("Email Address");
      //   },
      // },
      {
        label: "Given Name",
        command: () => {
          this.inserting("Given Name");
        },
      },
      // {
      //   label: "Family Name",
      //   command: () => {
      //     this.inserting("Family Name");
      //   },
      // },
      // {
      //   label: "Display Name",
      //   command: () => {
      //     this.inserting("Display Name");
      //   },
      // },
    ];
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleAllTemplates(data) {
    this.allTemplates = data.data;
  }
  /**
   * this function generated our input fields and their corresponding data
   * @param flag whether it is saved campaign or new campaign
   * @param data default data to get is input fields
   */
  generateFormData(flag, data?) {
    this.inputInfo = [];
    this.createInput(
      "message",
      "Enter the message you would like to send",
      "string",
      "textArea",
      data
        ? data
        : this.savedCampaignWhatInfo.message
        ? this.savedCampaignWhatInfo.message
        : "",
      [
        {
          type: Validators.required,
          msg: "You must enter your message",
        },
      ],
      flag,
      true
    );
    // this.createInput("password", "password", "text", [
    //   {
    //     type: Validators.required,
    //     msg: "You must enter your Password",
    //   },
    // ]);
  }

  /**
   * This functions takes multiple parameters and save them in an object of inputInfo
   *
   * @param label This is the name of the text boxes
   * @param messageBody message in the text area
   * @param inputType This tells us the context of the content i.e email, password etc
   * @param type This tells us the type of input i.e text, number, symbols etc
   * @param placeHolder place holder to display in our input
   * @param validatorsInfo This is an object of a model which contains validators type and message
   * @param flag switch between data
   * @param dataFlag if data is new or not
   */
  createInput(
    label,
    placeHolder,
    inputType,
    type,
    messageBody,
    validatorsInfo,
    flag,
    dataFlag?
  ) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.placeHolder = placeHolder;
    inputObj.flag = flag;
    inputObj.inputType = inputType;
    inputObj.messageBody = messageBody;
    inputObj.type = type;
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
    }
    this.campaignWhatInfo[label] = value;
    this.characterCountPercentage = ((value.length % 160) / 160) * 100;
  }
  /**
   * to navigate back to previous page with data
   */
  back() {
    this.router.navigate(["/side-panel/campaign-who"], {
      queryParams: { id: this.campaignWhatInfo.id },
    });
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
    // this.Jarwis.campaignWhat(this.campaignWhatInfo).subscribe(
    //   (data) => this.handleData(data, "success"),
    //   (error) => this.handleError(error, "error")
    // );
    // var object = {
    //   message: this.campaignWhatInfo.message,
    // };
    // this.campaignService.setData(object, "what");
    // this.router.navigateByUrl("/side-panel/campaign-when");
    this.counterInputs++;
    if (this.counterInputs < this.inputInfo.length) {
      return;
    }
    if (!this.campaignWhatInfo.message) {
      return;
    }
    let errorFlag = this.inputInfo.find((item) => item.errorFlag == true);
    if (errorFlag) {
      return;
    }

    this.messageService.clear();
    this.addMessages("info", "Info", "Please Wait...");

    this.Jarwis.saveCampaignData(this.campaignWhatInfo).subscribe(
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
    this.router.navigate(["side-panel/campaign-when"], {
      queryParams: { id: data.data.id },
    });
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
   * this function inserts pre saved string in our message body to be replaced by corresponding user data later
   * @param data string to enter
   * @param remv optional variable
   */
  inserting(data, remv?) {
    let msg = this.campaignWhatInfo.message
      ? this.campaignWhatInfo.message
      : "";
    this.campaignWhatInfo.message = msg + "{" + data + "}";
    this.generateFormData(true, this.campaignWhatInfo.message);

    // this.campaignWhatInfo.messageBody = this.mergeSendInfo.message;
    this.campaignWhatInfo.field = data;
    this.campaignWhatInfo.flag = true;
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
    }, 3000);
  }
  /**
   * this function is used to open our save template modal
   * @returns function call return after giving the error
   */
  createTemplate() {
    if (!this.campaignWhatInfo.message) {
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
   *
   * @param data this API call saves our template in our database
   * @param modelName this is name of the variable the is to be stored in
   */
  handleTemplate(data) {
    this.addMessages("success", "Success", data.message);
  }
}
