import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { CampaignWhoInfo } from "src/app/models/campaignWho-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-campaign-who",
  templateUrl: "./campaign-who.component.html",
  styleUrls: ["./campaign-who.component.css"],
})
export class CampaignWhoComponent implements OnInit {
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  inputInfo: InputInfo[] = [];
  /**
   * this flag is used to check whether the value of input field changed
   */
  changeFlag = false;
  /**
   * this array consists of contact groups
   */
  toList: any[] = [];
  // fromList: any[] = [];
  /**
   * this variable is used to change the steps of html
   */
  step: number = 1;
  /**
   * save the id of the campaign
   */
  campaignId: number;
  /**
   * number type variable for counting inputs
   */
  counterInputs = 0;
  noOfMessagesAllowed: number;
  sentMessages: number;
  events2: any[];
  campaignServiceId = 0;
  /**
   *new group flag
   */
  createNewGroup = false;
  /**
   *import contact flag
   */
  importContact = false;
  /**
   *saved compaigns i.e if old saved campaign is reopened then its data is loaded in this variable
   */
  public savedCampaignWhoInfo = new CampaignWhoInfo();
  /**
   *campaign who page data is saved in this variable
   */
  public campaignWhoInfo = new CampaignWhoInfo();
  /**
   * contact from list
   */
  fromList = [];
  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param Jarwis This connects Backend with Frontend
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param messageService is a message type variable created to display messages in our component
   * @param tokenStorage is used to access tokenstorageservice
   * @param activatedRoute is a router type variable created to use router functions to navigate within our project
   *
   */
  constructor(
    private Jarwis: AuthService,
    private messageService: MessageService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.id) {
        this.campaignId = queryParams.id;
        this.campaignWhoInfo.id = queryParams.id;
        this.Jarwis.getCampaign({ id: this.campaignId }).subscribe(
          (data) => this.handleSavedCampaignData(data),
          (error) => this.handleError(error)
        );
      } else if (!queryParams.id) {
        this.generateFormData();

        this.getGroupNames();
      }
    });
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleSavedCampaignData(data) {
    this.savedCampaignWhoInfo = data.data;
    this.savedCampaignWhoInfo.to = [];
    data.contactList.forEach((element) => {
      // this.savedCampaignWhoInfo.to.push(element.contactGroup);
    });
    debugger;
    this.getGroupNames();
  }
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    this.getServiceId();
  }
  /**
   * API call to gett group names
   */
  getGroupNames() {
    this.Jarwis.getGroupNames().subscribe(
      (data) => this.handleGroupNamesData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleGroupNamesData(data) {
    this.toList = data.contactGroups;
    this.toList.map((contactList) => {
      contactList.name =
        contactList.name +
        " ( " +
        Math.floor(contactList.contactCount / contactList.customFieldsCount) +
        " Contacts )";
    });
    // this.generateFormData([this.toList]);
  }
  getServiceId() {
    this.Jarwis.getServiceId({ name: "Campaigns" }).subscribe(
      (data) => this.handleServiceData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleServiceData(data) {
    this.campaignServiceId = data.data.id;
    this.getShortCodes(this.campaignServiceId);
  }
  getShortCodes(serviceId) {
    this.Jarwis.getUserShortCodes({ serviceId: serviceId }).subscribe(
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
      let obj = { name: element.shortCode, id: element.id };
      this.fromList.push(obj);
    });
  }
  /**
   * this function generated our input fields and their corresponding data
   * @param toData contact data for input fields
   */
  generateFormData(toData?) {
    this.inputInfo = [];
    this.createInput(
      "campaignName",
      "strng",
      "text2",
      "Makei sure it's something you can easily identify later.",
      "Please give your Campaign name",
      "",
      this.savedCampaignWhoInfo.campaignName
        ? this.savedCampaignWhoInfo.campaignName
        : "",
      [
        {
          type: Validators.required,
          msg: "You must give your Campaign name",
        },
      ],
      ""
    );
    this.createInput(
      "to",
      "string",
      "multiSelect",
      "Choose the group that you'd like to send to.",
      "Please select contact lists to send to",
      "",
      this.savedCampaignWhoInfo.to ? this.savedCampaignWhoInfo.to : "",
      [],
      toData ? toData : []
    );

    this.createInput(
      "from",
      "string",
      "dropDown",
      "Choose the group that you'd like to send to.",
      "Use shared numbers",
      this.fromList && this.fromList.length > 3
        ? "200px"
        : this.fromList.length * 50 + "px",
      this.savedCampaignWhoInfo.from
        ? { name: Number(this.savedCampaignWhoInfo.from) }
        : "",
      [],
      this.fromList
    );
  }

  /**
   * This functions takes multiple parameters and save them in an object of inputInfo
   *
   * @param label This is the name of the text boxes
   * @param scrollHeight scroll height of the dropdown and multiselect
   * @param inputType This tells us the context of the content i.e email, password etc
   * @param type This tells us the type of input i.e text, number, symbols etc
   * @param placeHolder place holder to display in our input
   * @param options data required to display by our input
   * @param validatorsInfo This is an object of a model which contains validators type and message
   * @param details data to show around input fields
   * @param value default valu of any input field
   */
  createInput(
    label,
    inputType,
    type,
    details,
    placeHolder,
    scrollHeight,
    value,
    validatorsInfo,
    options
  ) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.inputType = inputType;
    inputObj.type = type;
    inputObj.details = details;
    inputObj.placeHolder = placeHolder;
    inputObj.scrollHeight = scrollHeight;
    inputObj.val = value;
    inputObj.value = value;
    inputObj.validatorsInfo = validatorsInfo;
    inputObj.data = options;
    this.inputInfo.push(inputObj);
  }
  /**
   * This function updates the data on the login page if any change is made
   *
   * @param value This is the new value provided by the user
   * @param label This is the variable that passes along the value
   */
  updateData(value, label) {
    if (label == "from") {
      let obj = {
        shortCodeId: value.id,
        serviceId: this.campaignServiceId,
      };
      this.Jarwis.getSmscount(obj).subscribe(
        (data) => this.handleSmsData(data),
        (error) => this.handleError(error)
      );
    }
    this.campaignWhoInfo[label] = value;
  }
  handleSmsData(data) {
    this.noOfMessagesAllowed = data.allowedMessages;
    this.sentMessages = data.sentMessages;
    if (this.noOfMessagesAllowed == 0) {
      this.addMessages("error", "Error", "Package has expired");
      return;
    }
  }
  /**
   *
   * @param val val is no of step currently working
   */
  onClick(val) {
    this.step = 0;
    this.step = val;
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
    if (!this.campaignWhoInfo.to || this.campaignWhoInfo.to.length == 0) {
      this.addMessages("error", "Error", "Please select reciever ...");
      return;
    }

    if (!this.campaignWhoInfo.from) {
      this.addMessages("error", "Error", "Please select sender ...");
      return;
    }
    if (this.noOfMessagesAllowed == 0) {
      this.addMessages("error", "Error", "Package has expired");
      return;
    }
    this.messageService.clear();
    this.addMessages("info", "Info", "Please Wait...");
    this.Jarwis.saveCampaignData(this.campaignWhoInfo).subscribe(
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
    }, 3000);
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleData(data) {
    this.addMessages("success", "Success", data.message);
    this.router.navigate(["side-panel/campaign-what"], {
      queryParams: { id: data.data.id },
    });
  }
  /**
   * handle error is our function to handle error given by APi or custom made
   * @param error is the variable through which we recieve the error to display to the user
   */
  handleError(error) {
    let errorMessage = error.error.message
      ? error.error.message
      : error.message;
    this.messageService.clear();
    this.addMessages("error", "Error", errorMessage);
  }
  /**
   * new group modal opening function
   */
  createNewGorupModal() {
    this.createNewGroup = !this.createNewGroup;
    this.getGroupNames();
  }
  /**
   * import contact modal opening function
   */
  importContactModal() {
    this.importContact = !this.importContact;
    this.getGroupNames();
  }
}
