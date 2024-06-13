/**
 * this is sms plus dashboard component
 */
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { LineChartInfo } from "src/app/component/componentModel/lineChart-info";
import { SmsPlusDashboardInfo } from "src/app/models/smsPlusDashboard-info";
import { DatePipe } from "@angular/common";
import { Validators } from "@angular/forms";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { OptionInfo } from "src/app/component/componentModel/option-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-sms-plus-dashboard",
  templateUrl: "./sms-plus-dashboard.component.html",
  styleUrls: ["./sms-plus-dashboard.component.css"],
})
export class SmsPlusDashboardComponent implements OnInit {
  /**
   * show data / graph flag
   */
  showFlag = true;
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  inputInfo: InputInfo[] = [];
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  radioInputInfo: InputInfo[] = [];
  /**
   * count variable for dashboard sms data
   */
  allCounts = new SmsPlusDashboardInfo();
  /**
   * short codes array
   */
  shortCodes: any[];
  /**
   *service array
   */
  services: any[];
  /**
   * graph label to display
   */
  graphLabel: string = "Recieved Messages";
  /**
   * radio button options
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
   * graph data in raw form
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
   * graph options in raw form
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
   * selected shortcode
   */
  shortCode: number;
  /**
   * selected shortcode object
   */
  shortCodeSelected: any;
  /**
   * filter start date
   */
  startDate: string;
  /**
   * selected service to filter
   */
  service: string;
  /**
   * filter end date
   */
  endDate: string;
  /**
   * filter flag
   */
  filterFlag: boolean = false;
  /**
   * dashboard info
   */
  dashboardInfo: SmsPlusDashboardInfo[] = [];

  /**
   *
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param messageService is a message type variable created to display messages in our component
   * @param Jarwis is an angular service type variable used to call APIs required for our application
   * @param datePipe is an angular date pipe used to tranform date into our required form
   */
  constructor(
    private Jarwis: AuthService,
    private router: Router,
    private datePipe: DatePipe,
    private messageService: MessageService
  ) {}
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application and call the function to get data required at the begining of the component
   */
  ngOnInit(): void {
    this.getAllCounts();
    this.getGraphData("smsPlusRecievedMessage");

    this.getUserShortCodes();
  }
  /**
   * our function to call the API to get data
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
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleServiceData(data) {
    this.Jarwis.getUserShortCodes({ serviceId: data.data.id }).subscribe(
      (data) => this.handleCodesData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleCodesData(data) {
    this.shortCodes = data.data;
    this.shortCodes.map((item) => {
      item.name = item.shortCode;
    });
    this.generateFormData(this.radioOptions, "Recieved Messages");
  }
  /**
   * our function to call the API to get data
   */
  getMessageServices(shortCode) {
    this.Jarwis.getMessageServices(shortCode).subscribe(
      (data) => this.handleMessageServiceData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleMessageServiceData(data) {
    this.services = [];
    let serviceName = "";
    this.services = data.data;
    this.services.map((item) => {
      item.name = item.serviceName;
    });
    const result = Array.from(
      this.services.reduce((m, t) => m.set(t.name, t), new Map()).values()
    );
    this.services = result;
    this.generateFormData(this.radioOptions, this.graphLabel);
  }
  /**
   * our function to call the API to get data
   */
  getAllCounts() {
    this.Jarwis.getAllCount().subscribe(
      (data) => this.handleCount(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
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
   *our function to call the API to get the required data
   * @param dbName is the database name required to get data from the correct table
   * @param dates optional dates variable to get data across specific dates
   */
  getGraphData(dbName, dates?) {
    if (this.showFlag == true && dbName != "Debit") {
      this.Jarwis.getGraphData({
        name: "smsPlusRecievedMessage",
        shortCode: this.shortCode,
        dateFilter: dates,
      }).subscribe(
        (data) => this.handleGraphData(data),
        (error) => this.handleError(error)
      );
    }
    if (this.showFlag == true && dbName == "Debit") {
      this.Jarwis.getDebitGraphData({
        name: dbName,
        shortCode: this.shortCode,
        service: this.service,
        dateFilter: dates,
      }).subscribe(
        (data) => this.handleGraphData(data),
        (error) => this.handleError(error)
      );
    }
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleGraphData(data) {
    let yAxis = [];
    let xAxis = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    for (let i = 1; i <= 12; i++) {
      let count = 0;
      let found = data.data2.find((date) => date.Data == i);
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
   * this is our function to route the user to a specific page
   * @param data recieves the required data for the routing
   */
  route(data) {
    this.router.navigateByUrl("/side-panel/sms-plus/" + data);
  }
  /**
   *our function that is called by our inputs for further data handling
   * @param value contains the data/value provided by the user via our inouts
   * @param modelName name of the model variable for the data to be stored in
   * @returns returns our process from the call
   */
  updateData(value, modelName) {
    if (modelName == "graphType" && value) {
      this.graphLabel = value;
      delete this.shortCode;
      delete this.shortCodeSelected;
      delete this.service;
      delete this.services;
      this.getGraphData(value);
      this.generateFormData("", value);
      delete this.startDate;
      delete this.endDate;
    }
    if (modelName == "services" && value) {
      this.service = value.name;
      this.getGraphData("Debit");
    } else if (modelName == "services" && !value) {
      delete this.service;
      this.getGraphData(this.graphLabel);
    }
    if (modelName == "shortCode" && value) {
      this.shortCode = value.name;
      this.shortCodeSelected = value;
      this.getGraphData(this.graphLabel);
      this.getMessageServices(value);
    } else if (modelName == "shortCode" && !value) {
      delete this.shortCode;
      delete this.service;
      delete this.services;
      delete this.shortCodeSelected;
      this.generateFormData(this.radioOptions, this.graphLabel);
      this.getGraphData(this.graphLabel);
    }
    if (modelName == "startDate") {
      this.startDate = value;
    }
    if (modelName == "endDate") {
      this.endDate = value;
    }
    if (this.startDate && this.endDate) {
      this.startDate = this.datePipe.transform(this.startDate, "yyyy-MM-dd");
      this.endDate = this.datePipe.transform(this.endDate, "yyyy-MM-dd");
      // if (
      //   this.endDate.toString().split(" ")[2] >
      //   this.startDate.toString().split(" ")[2]
      // ) {
      //   this.addMessages(
      //     "error",
      //     "Error",
      //     "End date cannot be less than start date"
      //   );

      //   return;
      // }
      let obj = {
        startDate: this.startDate + "T00:00:00.000Z",
        endDate: this.endDate + "T23:59:59.000Z",
      };
      this.getGraphData(this.graphLabel, obj);
    } else if (!this.startDate && !this.endDate) {
      if (modelName == "startDate" || modelName == "endDate") {
        this.getGraphData(this.graphLabel);
      }
    }
  }
  /**
   *our function to generate data for our input fields
   * @param graphTypes optional variable contains graph tpye name stirngs
   * @param graphtypeFlag optional flag to switch between graphs
   */
  generateFormData(graphTypes?, graphtypeFlag?) {
    if (graphTypes.length > 0) {
      this.createInput(
        "graphType",
        "",
        "graphType",
        "",
        "radioButton",
        graphTypes,
        "",
        graphTypes[0],
        "",
        "",
        [],
        true
      );
    }
    this.inputInfo = [];

    if (graphtypeFlag == "Recieved Messages") {
      this.createInput(
        "shortCode",
        "Please select short code here",
        "",
        "string",
        "dropDown",
        "",
        "",
        this.shortCodeSelected,
        this.shortCodes,
        this.shortCodes && this.shortCodes.length > 3
          ? "200px"
          : this.shortCodes.length * 50 + "px",
        []
      );
      // this.createInput(
      //   "Start Date",
      //   "select date here",
      //   "startDate",
      //   "date",
      //   "calender",
      //   "",
      //   "  ",
      //   "scheduled delivery date",
      //   "",
      //   "",
      //   []
      // );
      // this.createInput(
      //   "End Date",
      //   "select date here",
      //   "endDate",
      //   "date",
      //   "calender",
      //   "",
      //   "  ",
      //   "scheduled delivery date",
      //   "",
      //   "",
      //   []
      // );
    }
    if (graphtypeFlag == "Debit") {
      this.createInput(
        "shortCode",
        "Please select short code here",
        "",
        "string",
        "dropDown",
        "",
        "",
        this.shortCodeSelected,
        this.shortCodes,
        this.shortCodes && this.shortCodes.length > 3
          ? "200px"
          : this.shortCodes.length * 50 + "px",
        []
      );
      this.createInput(
        "services",
        "Please select service here",
        "",
        "string",
        "dropDown",
        "",
        "",
        "",
        this.services,
        this.services && this.services.length > 3
          ? "200px"
          : this.services
          ? this.services.length * 50 + "px"
          : "",
        []
      );

      // this.createInput(
      //   "Start Date",
      //   "select date here",
      //   "startDate",
      //   "date",
      //   "calender",
      //   "",
      //   "  ",
      //   "  ",
      //   "scheduled delivery date",
      //   "",
      //   "",
      //   []
      // );
      // this.createInput(
      //   "End Date",
      //   "select date here",
      //   "endDate",
      //   "date",
      //   "calender",
      //   "",
      //   "  ",
      //   "  ",
      //   "scheduled delivery date",
      //   "",
      //   "",
      //   []
      // );
    }
  }
  /**
   * our function that creates data required for our inputs in an inputinfo type array
   * @param label is the label of the input field
   * @param placeHolder is the placeholder of the input field
   * @param modelName is the model name for the data to be stored
   * @param inputType is input type of any specific i.e sttring,number,date etc
   * @param type is flag to differentiate between different input types
   * @param option is a variable to send data to our input field to dislpay (for dropsdowns and multiselect etc)
   * @param details to show any string our data around the input field
   * @param val to stored default value of any input field if any
   * @param data is a variable to send data to our input field to dislpay (for dropsdowns and multiselect etc)
   * @param scrollHeight is a variable to control the scroll hieght of our input field to dislpay (for dropsdowns and multiselect etc)
   * @param validatorsInfo validation errors and function required for our form
   * @param flag optional flag to switch between arrays to store data
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
    validatorsInfo,
    flag?
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

    if (flag == true) {
      this.radioInputInfo.push(inputObj);
    } else {
      this.inputInfo.push(inputObj);
    }
  }
}
