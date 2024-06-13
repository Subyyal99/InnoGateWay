import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { OptionInfo } from "src/app/component/componentModel/option-info";
import { SmsPlusDashboardInfo } from "src/app/models/smsPlusDashboard-info";

@Component({
  selector: "app-campaign-reporting",
  templateUrl: "./campaign-reporting.component.html",
  styleUrls: ["./campaign-reporting.component.css"],
})
export class CampaignReportingComponent implements OnInit {
  /**
   * this flag toggles the display of the graph
   */
  showFlag = true;
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  inputInfo: InputInfo[] = [];
  /**
   * no of message of all type
   */
  allCounts = new SmsPlusDashboardInfo();
  /**
   * names of all campaigns for dropdown
   */
  campaignNames: any[] = [{ name: "All Campaigns" }];
  /**
   * service array to store all service
   */
  services: any[];
  /**
   * date range data array
   */
  dateRangeData: any[] = [];
  /**
   * campaign id variable
   */
  campaignId: number;
  /**
   * graph label
   */
  graphLabel: string = "Message Summary";
  /**
   * name of the campaign searched
   */
  searchedName: string;
  /**
   * object array to display campaign reporting
   */
  reportObjectsArray: any[] = [
    {
      icon: "fas fa-cloud-upload-alt",
      type: { name: "totalOutGoingMessages", value: 0 },
    },
    {
      icon: "fas fa-check-square",
      type: { name: "delivered", value: 0 },
      type2: { name: "sent", value: 0 },
    },
    {
      icon: "fas fa-exclamation-triangle",
      type: { name: "undelivered", value: 0 },
      type2: { name: "invalidNumber", value: 0 },
      type3: { name: "rejected", value: 0 },
      Undelivered: 0,
      invalidNumber: 0,
      rejected: 0,
    },
    { icon: "fas fa-ban", type: { name: "optOut", value: 0 } },
  ];
  /**
   * radio options for switching between graphs
   */
  radioOptions: OptionInfo[] = [
    {
      key: "recievedMessages",
      brand: "recievedMessages",
      value: "Recieved Messages",
    },
    {
      key: "debit",
      brand: "debit",
      value: "Debit",
    },
  ];
  /**
   * chart data for the graph to show
   */
  chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "First Dataset",
        data: [],
        fill: false,
        backgroundColor: "#53a3f6",
        borderColor: "#53a3f6",
        tension: 0.4,
      },
    ],
  };
  /**
   * chart options
   */
  chartOptions: any = {
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        ticks: {
          stepSize: 1,
          color: "#24244e",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };
  /**
   * max date to be selected
   */
  maxDate: Date;
  /**
   * end date of the date range
   */
  endDate: Date = new Date();
  /**
   * start date of the date range
   */
  startDate: Date = new Date(new Date().setDate(this.endDate.getDate() - 7));
  /**
   * campaign
   */
  campaign: string;
  /**
   * filter flag whether to filter data or not
   */
  filterFlag: boolean = false;
  /**
   * dashboard info saved in this array
   */
  dashboardInfo: SmsPlusDashboardInfo[] = [];
  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param Jarwis This connects Backend with Frontend
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param messageService is a message type variable created to display messages in our component
   * @param activatedRoute is a router type variable created to use router functions to navigate within our project
   * @param datePipe to tranform date into required manner
   *
   */
  constructor(
    private Jarwis: AuthService,
    private router: Router,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.campaignId = queryParams.id;
      this.searchedName = queryParams.name;
      this.Jarwis.getCampaigns().subscribe(
        (data) => this.handleCampaignData(data, "allCampaign"),
        (error) => this.handleError(error)
      );
    });
  }
  /**
   * return call from our API
   * @param data data retrieved from the API
   * @param from which campaign or campaigns data is coming
   */
  handleCampaignData(data, from) {
    data.data.forEach((element) => {
      let obj = { name: element.campaignName, id: element.id };
      this.campaignNames.push(obj);
    });
    if (this.campaignId && this.searchedName) {
      this.generateFormData(
        this.campaignNames.find((x) => x.name == this.searchedName)
      );
      this.getGraphData("sms");
    } else {
      this.getGraphData("sms");
      this.generateFormData();
    }

    // this.getAllCounts();
    // this.getGraphData("smsPlusRecievedMessage");
    // this.getUserShortCodes();
  }
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {}
  /**
   * API call to get short codes by service
   */
  getUserShortCodes() {
    this.Jarwis.getService({
      name: "SMS Plus",
    }).subscribe(
      (data) => this.handleServiceData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * return call from our API
   * @param data data retrieved from the API
   */
  handleServiceData(data) {
    this.Jarwis.getUserShortCodes({ serviceId: data.data.id }).subscribe(
      (data) => this.handleCodesData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * return call from our API
   * @param data data retrieved from the API
   */
  handleCodesData(data) {
    // this.shortCodes = data.data;
    // this.shortCodes.map((item) => {
    //   item.name = item.shortCode;
    // });
    this.getMessageServices();
  }
  /**
   * message service API call
   */
  getMessageServices() {
    this.Jarwis.getMessageServices().subscribe(
      (data) => this.handleMessageServiceData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * return call from our API
   * @param data data retrieved from the API
   */
  handleMessageServiceData(data) {
    this.services = data.data;
    this.services.map((item) => {
      item.name = item.serviceName;
    });
  }
  /**
   * get count from db API call
   */
  getAllCounts() {
    this.Jarwis.getAllCount().subscribe(
      (data) => this.handleCount(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * return call from our API
   * @param data data retrieved from the API
   */
  handleCount(data) {
    this.allCounts.receivedMessageCount = data.receivedMessageCount;
    this.allCounts.balanceDeductionMessageCount =
      data.balanceDeductionMessageCount;
    this.allCounts.checkKeywordMessageCount = data.checkKeywordMessageCount;
    this.allCounts.successfullMessageCount = data.successfullMessageCount;
    this.allCounts.sentMessageCount = data.sentMessageCount;
  }
  /**
   * graph data API call
   * @param dbName name of the database to get data from
   * @param dates across which to get the data
   */
  getGraphData(dbName, dates?) {
    if (this.showFlag == true && dbName == "sms") {
      this.Jarwis.getCampaignGraphData({
        name: "sms",
        campaignId: this.campaignId,
        dateFilter: dates,
      }).subscribe(
        (data) => this.handleGraphData(data),
        (error) => this.handleError(error)
      );
    }
  }
  /**
   * return call from our API
   * @param data data retrieved from the API
   */
  handleGraphData(data) {
    let yAxis = [];
    let xAxis = [];
    xAxis.push(this.datePipe.transform(this.endDate, "yyyy-MM-dd"));
    if (this.endDate) {
      for (let i = 1; i <= 7; i++) {
        let backdate = new Date(
          this.endDate.setDate(this.endDate.getDate() - 1)
        );
        let date = backdate.toString();
        date = this.datePipe.transform(backdate, "yyyy-MM-dd");
        xAxis.push(date);
      }
    }
    xAxis.reverse();
    xAxis.forEach((element) => {
      let count = 0;
      let found = data.data2.find((date) => date.Data == element);
      if (found) {
        count = found.count;
      }
      yAxis.push(count);
    });
    for (let i = 1; i <= 8; i++) {
      let count = 0;
      let found = data.data2.find((date) => date.Data == this.endDate);
      let date = this.datePipe.transform(this.endDate, "yyyy-MM-dd");
      if (found) {
        count = found.count;
      }
      yAxis.push(count);
    }
    this.chartData = {
      labels: xAxis,
      datasets: [
        {
          label: this.graphLabel,
          data: yAxis,
          fill: true,
          backgroundColor: "#53a3f6",
          borderColor: "#53a3f6",
          tension: 0.4,
        },
      ],
    };
  }
  /**
   * handle error is our function to handle error given by APi or custom made
   * @param error is the variable through which we recieve the error to display to the user
   */
  handleError(error) {
    this.messageService.clear();
    this.addMessages(
      "error",
      "Error",
      error.error.message ? error.error.message : error.message
    );
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
    }, 3000);
  }
  /**
   * This function updates the data on the login page if any change is made
   *
   * @param value This is the new value provided by the user
   * @param label This is the variable that passes along the value
   */
  updateData(value, modelName) {
    if (modelName == "campaigns" && value) {
      this.campaign = value.name;
      this.campaignId = value.id;
      this.getGraphData("sms");
    } else if (modelName == "campaigns" && !value) {
      delete this.campaign;
      this.getGraphData(this.graphLabel);
    }
    if (modelName == "startDate" && value) {
      this.dateRangeData = value;
      this.maxDate = new Date(
        new Date().setDate(this.dateRangeData[0].getDate() + 7)
      );
    }

    if (this.dateRangeData.length > 0) {
      let startDate;
      let endDate;
      this.startDate = this.dateRangeData[0];
      this.endDate = this.dateRangeData[1];
      startDate = this.datePipe.transform(this.dateRangeData[0], "yyyy-MM-dd");
      endDate = this.datePipe.transform(this.dateRangeData[1], "yyyy-MM-dd");
      let obj = {
        startDate: startDate + "T00:00:00.000Z",
        endDate: endDate + "T23:59:59.000Z",
      };

      this.getGraphData("sms", obj);
    } else if (!this.startDate && !this.endDate) {
      this.getGraphData("sms");
    }
  }
  /**
   * this function generated our input fields and their corresponding data
   * @param val optional variable if value then set as default
   */
  generateFormData(val?) {
    this.inputInfo = [];
    this.createInput(
      "Start Date",
      "select date here",
      "startDate",
      "date",
      "calender",
      "",
      "  ",
      "scheduled delivery date",
      "",
      "",
      []
    );
    this.createInput(
      "campaigns",
      "Please select campaign here",
      "",
      "string",
      "dropDown",
      "",
      "",
      val ? val : this.campaignNames[0],
      this.campaignNames,
      this.campaignNames && this.campaignNames.length > 3
        ? "200px"
        : this.campaignNames.length * 50 + "px",
      []
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
   * @param scrollHeight sets the height of dropdown
   * @param validatorsInfo This is an object of a model which contains validators type and message
   * @param details data to show around input fields
   * @param val default valu of any input field
   * @param option optios for radio buttons
   */
  createInput(
    label,
    placeHolder,
    modelName,
    inputType,
    type,
    option,
    details,
    val,
    data,
    scrollHeight,
    validatorsInfo
  ) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.placeHolder = placeHolder;
    inputObj.modelName = modelName;
    inputObj.inputType = inputType;
    inputObj.type = type;
    inputObj.option = option;
    inputObj.details = details;
    inputObj.value = val;
    inputObj.val = val;
    inputObj.data = data;
    inputObj.scrollHeight = scrollHeight;
    inputObj.validatorsInfo = validatorsInfo;
    this.inputInfo.push(inputObj);
  }
  /**
   * this functions clears all data
   */
  clear() {
    this.maxDate = new Date();
    this.dateRangeData = [];
    delete this.startDate;
    delete this.endDate;
  }
}
