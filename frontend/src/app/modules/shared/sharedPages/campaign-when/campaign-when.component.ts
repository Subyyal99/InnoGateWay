import { IfStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { CampaignWhenInfo } from "src/app/models/campaignWhen-info";
import { CampaignService } from "src/app/services/campaign.service";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-campaign-when",
  templateUrl: "./campaign-when.component.html",
  styleUrls: ["./campaign-when.component.css"],
})
export class CampaignWhenComponent implements OnInit {
  /**
   * variable to create specific type of input fields at certain time
   */
  dontSendAfterInputInfo: InputInfo[] = [];
  /**
   * variable to create input fields
   */
  inputInfo: InputInfo[] = [];
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
  savedCampaignWhenInfo = new CampaignWhenInfo();
  /**
   *campaign who page data is saved in this variable
   */
  campaignWhenInfo = new CampaignWhenInfo();
  /**
   * time string variable
   */
  time = "";
  /**
   * loop flag whether to break or start loop
   */
  loopFlag = false;
  /**
   * time counter
   */
  timeCounter = 0;
  /**
   * time stamp variable
   */
  timeStamp = 0;
  /**
   * array of time before sending message
   */
  messageBefore = [
    { id: 0, name: "12:00 AM" },
    { id: 1, name: "12:30 AM" },
    { id: 2, name: "01:00 AM" },
    { id: 3, name: "01:30 AM" },
    { id: 4, name: "02:00 AM" },
    { id: 5, name: "02:30 AM" },
    { id: 6, name: "03:00 AM" },
    { id: 7, name: "03:30 AM" },
    { id: 8, name: "04:00 AM" },
    { id: 9, name: "04:30 AM" },
    { id: 10, name: "05:00 AM" },
    { id: 11, name: "05:30 AM" },
    { id: 12, name: "06:00 AM" },
    { id: 13, name: "06:30 AM" },
    { id: 14, name: "07:00 AM" },
    { id: 15, name: "07:30 AM" },
    { id: 16, name: "08:00 AM" },
    { id: 17, name: "08:30 AM" },
    { id: 18, name: "09:00 AM" },
    { id: 19, name: "09:30 AM" },
    { id: 20, name: "10:00 AM" },
    { id: 21, name: "10:30 AM" },
    { id: 22, name: "11:00 AM" },
    { id: 22, name: "11:30 AM" },
    { id: 24, name: "12:00 PM" },
    { id: 25, name: "12:30 PM" },
    { id: 26, name: "01:00 PM" },
    { id: 27, name: "01:30 PM" },
    { id: 28, name: "02:00 PM" },
    { id: 29, name: "02:30 PM" },
    { id: 30, name: "03:00 PM" },
    { id: 31, name: "03:30 PM" },
    { id: 32, name: "04:00 PM" },
    { id: 33, name: "04:30 PM" },
    { id: 34, name: "05:00 PM" },
    { id: 35, name: "05:30 PM" },
    { id: 36, name: "06:00 PM" },
    { id: 37, name: "06:30 PM" },
    { id: 38, name: "07:00 PM" },
    { id: 39, name: "07:30 PM" },
    { id: 40, name: "08:00 PM" },
    { id: 41, name: "08:30 PM" },
    { id: 42, name: "09:00 PM" },
    { id: 43, name: "09:30 PM" },
    { id: 44, name: "10:00 PM" },
    { id: 45, name: "10:30 PM" },
    { id: 46, name: "11:00 PM" },
    { id: 47, name: "11:30 PM" },
  ];
  /**
   * array of time before sending message
   */
  messageBefore2 = [
    { id: 0, name: "12:00 AM" },
    { id: 1, name: "12:30 AM" },
    { id: 2, name: "01:00 AM" },
    { id: 3, name: "01:30 AM" },
    { id: 4, name: "02:00 AM" },
    { id: 5, name: "02:30 AM" },
    { id: 6, name: "03:00 AM" },
    { id: 7, name: "03:30 AM" },
    { id: 8, name: "04:00 AM" },
    { id: 9, name: "04:30 AM" },
    { id: 10, name: "05:00 AM" },
    { id: 11, name: "05:30 AM" },
    { id: 12, name: "06:00 AM" },
    { id: 13, name: "06:30 AM" },
    { id: 14, name: "07:00 AM" },
    { id: 15, name: "07:30 AM" },
    { id: 16, name: "08:00 AM" },
    { id: 17, name: "08:30 AM" },
    { id: 18, name: "09:00 AM" },
    { id: 19, name: "09:30 AM" },
    { id: 20, name: "10:00 AM" },
    { id: 21, name: "10:30 AM" },
    { id: 22, name: "11:00 AM" },
    { id: 22, name: "11:30 AM" },
    { id: 24, name: "12:00 PM" },
    { id: 25, name: "12:30 PM" },
    { id: 26, name: "01:00 PM" },
    { id: 27, name: "01:30 PM" },
    { id: 28, name: "02:00 PM" },
    { id: 29, name: "02:30 PM" },
    { id: 30, name: "03:00 PM" },
    { id: 31, name: "03:30 PM" },
    { id: 32, name: "04:00 PM" },
    { id: 33, name: "04:30 PM" },
    { id: 34, name: "05:00 PM" },
    { id: 35, name: "05:30 PM" },
    { id: 36, name: "06:00 PM" },
    { id: 37, name: "06:30 PM" },
    { id: 38, name: "07:00 PM" },
    { id: 39, name: "07:30 PM" },
    { id: 40, name: "08:00 PM" },
    { id: 41, name: "08:30 PM" },
    { id: 42, name: "09:00 PM" },
    { id: 43, name: "09:30 PM" },
    { id: 44, name: "10:00 PM" },
    { id: 45, name: "10:30 PM" },
    { id: 46, name: "11:00 PM" },
    { id: 47, name: "11:30 PM" },
  ];
  /**
   * array of time after sending each batch of messages
   */
  messageAfter: any[];
  /**
   * array of message sending type
   */
  items = [
    {
      label: "Send it now",
      command: () => {
        this.contactData("Send it now");
      },
    },
    {
      label: "Schedule for later",
      command: () => {
        this.contactData("Schedule for later");
      },
    },
    {
      label: "Stagger my campaign",
      command: () => {
        this.contactData("Stagger my campaign");
      },
    },
  ];
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
      this.campaignWhenInfo.id = queryParams.id;
      if (queryParams.id) {
        this.campaignWhenInfo.id = queryParams.id;
        this.Jarwis.getCampaign({ id: this.campaignWhenInfo.id }).subscribe(
          (data) => this.handleSavedCampaignData(data),
          (error) => this.handleError(error)
        );
      } else if (!queryParams.id) {
      }
    });
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleSavedCampaignData(data) {
    this.savedCampaignWhenInfo = data.data;
    this.contactData(data.data.sendType);
  }
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {}
  /**
   * function detemine what type and when to send messages in what form
   * @param value gets the type
   */
  contactData(value) {
    this.campaignWhenInfo.sendType = value;
    if (
      this.campaignWhenInfo.sendType == "Send it now" ||
      this.campaignWhenInfo.sendType == "Send It Now"
    ) {
      // this.Jarwis.saveCampaignData(this.campaignWhenInfo).subscribe(
      //   (data) => this.handleData(data),
      //   (error) => this.handleError(error)
      // );
    } else if (
      this.campaignWhenInfo.sendType == "Schedule for later" ||
      "Schedule For Later"
    ) {
      this.generateFormData(value);
    } else if (
      this.campaignWhenInfo.sendType == "Stagger my campaign" ||
      "Stagger My Campaign"
    ) {
      this.generateFormData(value);
      this.dontSendAfter();
    }
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleData(data) {
    this.addMessages("success", "Success", data.message);
    this.router.navigate(["side-panel/test-and-confirm"], {
      queryParams: { id: data.data.id },
    });
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
   * @param sendType determines how many and what type of input fields to generate
   */
  generateFormData(sendType) {
    this.inputInfo = [];
    if (sendType == "Schedule for later" || sendType == "Schedule For Later") {
      this.createInput(
        "Start Schedule Date",
        "startScheduleDate",
        "date",
        "calender",
        "dd/mm/yyyy  ",
        "scheduled delivery date",
        [
          {
            type: Validators.required,
            msg: "You must select your schedule start date and time",
          },
        ],
        ""
      );
      this.createInput(
        "End Schedule Date",
        "endScheduleDate",
        "date",
        "calender",
        "dd/mm/yyyy  ",
        "Testing as well ",
        [
          {
            type: Validators.required,
            msg: "You must select your schedule end date and time",
          },
        ],
        ""
      );
    } else if (
      sendType == "Stagger my campaign" ||
      sendType == "Stagger My Campaign"
    ) {
      this.createInput(
        "Start Schedule Date",
        "startScheduleDate",
        "date",
        "calender",
        "dd/mm/yyyy  ",
        "scheduled delivery date",
        [
          {
            type: Validators.required,
            msg: "You must select your schedule start date and time",
          },
        ],
        ""
      );
      this.createInput(
        "End Schedule Date",
        "endScheduleDate",
        "date",
        "calender",
        "dd/mm/yyyy  ",
        "Testing as well ",
        [
          {
            type: Validators.required,
            msg: "You must select your schedule end date and time",
          },
        ],
        ""
      );
      this.createInput(
        "Batch Size",
        "batchSize",
        "number",
        "text2",
        "No. of messages",
        "messages",
        [
          {
            type: Validators.required,
            msg: "You must enter batch size",
          },
        ],
        ""
      );
      this.createInput(
        "Time between batches ",
        "betweenBatchHour",
        "number",
        "text2",
        "No. of hour(s)",
        "hour(s)",
        [
          {
            type: Validators.required,
            msg: "You must enter batch size",
          },
        ],
        ""
      );
      this.createInput(
        "",
        "betweenBatchMinutes",
        "number",
        "text2",
        "No. of minute(s)",
        "minute(s)",
        [
          {
            type: Validators.required,
            msg: "You must enter batch size",
          },
          {
            type: Validators.max(59),
            name: "max",
            msg: "Minutes between batches cannot be greater than 59",
          },
        ],
        ""
      );
      this.createInput(
        "Don't send any messages before",
        "dontSendBefore",
        "string",
        "dropDown",
        "Choose the group that you'd like to send to.",
        "Use shared numbers",
        [
          {
            type: Validators.required,
            msg: "You must select time",
          },
        ],
        this.messageBefore2
      );
      // this.createInput(
      //   "Don't send any messages after",
      //   "messageAfter",
      //   "string",
      //   "dropDown",
      //   "Choose the group that you'd like to send to.",
      //   "Use shared numbers",
      //   [],
      //   this.messageAfter
      // );
    }
  }

  /**
   * This functions takes multiple parameters and save them in an object of inputInfo
   *
   * @param label This is the name of the text boxes
   * @param modelName name of the variable the date is to be stored
   * @param inputType This tells us the context of the content i.e email, password etc
   * @param type This tells us the type of input i.e text, number, symbols etc
   * @param placeHolder place holder to display in our input
   * @param validatorsInfo This is an object of a model which contains validators type and message
   * @param details data to show around input fields
   * @param data default valu of any input field
   */
  createInput(
    label,
    modelName,
    inputType,
    type,
    placeHolder,
    details,
    validatorsInfo,
    data
  ) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.modelName = modelName;
    inputObj.inputType = inputType;
    inputObj.type = type;
    inputObj.placeHolder = placeHolder;
    inputObj.details = details;
    inputObj.validatorsInfo = validatorsInfo;
    inputObj.data = data;
    this.inputInfo.push(inputObj);
  }
  /**
   * This function updates the data on the login page if any change is made
   *
   * @param value This is the new value provided by the user
   * @param label This is the variable that passes along the value
   */
  updateData(value, label) {
    this.campaignWhenInfo[label] = value;

    if (label == "dontSendBefore" && value && this.loopFlag == false) {
      let test = this.messageBefore.find((index) => index.id == value.id).id;
      this.messageAfter = this.messageBefore.slice(test, 49);
      for (let i = 0; i < this.messageAfter.length; i++) {
        this.timeStamp = this.timeCounter / 60;
        this.timeCounter = this.timeCounter + 30;
        let tempStr = this.messageAfter[i].name;
        if (this.timeStamp == 0) {
          this.messageAfter[i].name =
            tempStr + " (" + this.timeStamp + " mins)";
        } else if (this.timeStamp == 0.5) {
          this.messageAfter[i].name = tempStr + " (" + 30 + " mins)";
        } else if (this.timeStamp == 1) {
          this.messageAfter[i].name = tempStr + " (" + this.timeStamp + " hr)";
        } else {
          this.messageAfter[i].name = tempStr + " (" + this.timeStamp + " hrs)";
        }
      }
      this.dontSendAfter();
      this.loopFlag = true;
    }
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
    if (
      this.counterInputs <
      this.inputInfo.length + this.dontSendAfterInputInfo.length
    ) {
      return;
    }
    // if (
    //   this.campaignWhenInfo.betweenBatchMinutes > 60 ||
    //   this.campaignWhenInfo.betweenBatchMinutes == 60
    // ) {
    //   this.addMessages(
    //     "error",
    //     "Error",
    //     "Minutes between batches cannot be greater than 59"
    //   );
    //   return;
    // }
    let errorFlag = this.inputInfo.find((item) => item.errorFlag == true);
    if (errorFlag) {
      return;
    }
    let startDate = this.campaignWhenInfo.startScheduleDate.toString();
    startDate = startDate.split(" ")[2];
    let endDate = this.campaignWhenInfo.endScheduleDate.toString();
    endDate = endDate.split(" ")[2];
    if (startDate > endDate) {
      this.addMessages(
        "error",
        "Error",
        "Schedule ending date cannot be in the past"
      );
      return;
    }
    this.Jarwis.saveCampaignData(this.campaignWhenInfo).subscribe(
      (data) => this.handleData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * function to navigate to previous pages with data if any
   */
  back() {
    this.router.navigateByUrl("/side-panel/campaign-what");
    this.router.navigate(["/side-panel/campaign-what"], {
      queryParams: { id: this.campaignWhenInfo.id },
    });
  }
  /**
   *
   * @returns a function to check the sendtype is entered or not
   */
  checkSendType() {
    if (!this.campaignWhenInfo.sendType) {
      this.addMessages("error", "Error", "You must select campaign time");
      return;
    }
  }
  /**
   *
   * @param value time at which message is to be sent
   */
  sendingTime(value) {
    this.time = value;
  }
  /**
   * API call to save campaign
   * @param value campaign data
   */
  sendData(value) {
    this.Jarwis.saveCampaignData(this.campaignWhenInfo).subscribe(
      (data) => this.handleData(data),
      (error) => this.handleError(error)
    );
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
  /**
   * dont send after input field is generated here
   */
  dontSendAfter() {
    this.dontSendAfterInputInfo = [];
    this.createdontSendAfterInput(
      "Don't send any messages after",
      "dontSendAfter",
      "string",
      "dropDown",
      "Choose the group that you'd like to send to.",
      "Use shared numbers",
      [
        {
          type: Validators.required,
          msg: "You must select time",
        },
      ],
      this.messageAfter
    );
  }
  /**
   * This functions takes multiple parameters and save them in an object of inputInfo
   *
   * @param label This is the name of the text boxes
   * @param modelName name of the variable the date is to be stored
   * @param inputType This tells us the context of the content i.e email, password etc
   * @param type This tells us the type of input i.e text, number, symbols etc
   * @param placeHolder place holder to display in our input
   * @param validatorsInfo This is an object of a model which contains validators type and message
   * @param details data to show around input fields
   * @param data default valu of any input field
   */
  createdontSendAfterInput(
    label,
    modelName,
    inputType,
    type,
    placeHolder,
    details,
    validatorsInfo,
    data
  ) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.modelName = modelName;
    inputObj.inputType = inputType;
    inputObj.type = type;
    inputObj.placeHolder = placeHolder;
    inputObj.details = details;
    inputObj.validatorsInfo = validatorsInfo;
    inputObj.data = data;
    this.dontSendAfterInputInfo.push(inputObj);
  }
}
