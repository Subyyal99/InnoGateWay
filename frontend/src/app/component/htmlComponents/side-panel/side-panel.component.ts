/**
 * This is our side panel component, to be used through out our program
 */
import { style } from "@angular/animations";
import { Component, OnInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { SidePanelInfo } from "../../componentModel/sidePnael-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-side-panel",
  templateUrl: "./side-panel.component.html",
  styleUrls: ["./side-panel.component.css"],
})
export class SidePanelComponent implements OnInit {
  /**
   * This is the constructor of our component
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param Jarwis is an angular service type variable used to call APIs required for our application
   */
  constructor(public router: Router, private Jarwis: AuthService) {}
  /**
   * show/hide sms option on side panel
   */
  smsFlag: boolean = false;
  /**
   * show/hide sms plus option on side panel
   */
  smsPlusFlag: boolean = false;
  /**
   * show/hide televoting option on side panel
   */
  televotingFlag: boolean = false;
  /**
   * show/hide sms reporting option on side panel
   */
  smsReportingFlag: boolean = false;
  /**
   * show/hide received sms option on side panel
   */
  othersReceivedMessagesFlag: boolean = false;
  showFlag: boolean = true;
  screenSize: number;
  /**
   *side panel data in this object
   */
  sidePanelInfo = new SidePanelInfo();
  /**
   * This is our life cycle hook that runs when our component loads and it creates an array
   */
  ngOnInit(): void {
    this.checkUserServices();
  }
  ngAfterViewInit() {
    this.screenSize = window.innerWidth;
    if (this.screenSize <= 1025) {
      this.showFlag = false;
    }
    if (this.screenSize >= 1028) {
      this.showFlag = true;
    }
  }
  /**
   * this function changes the display and style of the side panel
   * @param cond conditions of the sidepanel
   */
  hideShow(cond) {
    // comment might be needed later

    let smsPlus = document.getElementById("smsPlus");
    let recMsg = document.getElementById("recMsg");
    let televoting = document.getElementById("televoting");
    let sms = document.getElementById("sms");
    let smsReporting = document.getElementById("smsReporting");
    let smsPlusSelect = document.getElementById("smsPlusSelect");
    let smsReportingSelect = document.getElementById("smsReportingSelect");
    let televotingSelect = document.getElementById("televotingSelect");
    let recMsgSelect = document.getElementById("recMsgSelect");
    let smsSelect = document.getElementById("smsSelect");

    if (cond == "sms") {
      if (sms.style.display == "flex") {
        sms ? (sms.style.display = "none") : "";
      } else {
        sms ? (sms.style.display = "flex") : "";
        smsPlus ? (smsPlus.style.display = "none") : "";
        smsReporting ? (smsReporting.style.display = "none") : "";
        televoting ? (televoting.style.display = "none") : "";
        recMsg ? (recMsg.style.display = "none") : "";
        smsSelect
          ? smsSelect.setAttribute("class", "nav-link text-white active")
          : "";
        recMsgSelect
          ? recMsgSelect.setAttribute("class", "nav-link text-white ")
          : "";
        televotingSelect
          ? televotingSelect.setAttribute("class", "nav-link text-white ")
          : "";
        smsPlusSelect
          ? smsPlusSelect.setAttribute("class", "nav-link text-white ")
          : "";
        smsReportingSelect
          ? smsReportingSelect.setAttribute("class", "nav-link text-white ")
          : "";
      }
    } else if (cond == "smsPlus") {
      if (smsPlus.style.display == "flex") {
        smsPlus ? (smsPlus.style.display = "none") : "";
      } else {
        smsPlus ? (smsPlus.style.display = "flex") : "";
        sms ? (sms.style.display = "none") : "";
        smsReporting ? (smsReporting.style.display = "none") : "";
        recMsg ? (recMsg.style.display = "none") : "";
        televoting ? (televoting.style.display = "none") : "";
        smsPlusSelect
          ? smsPlusSelect.setAttribute("class", "nav-link text-white active")
          : "";
        smsSelect
          ? smsSelect.setAttribute("class", "nav-link text-white ")
          : "";
        televotingSelect
          ? televotingSelect.setAttribute("class", "nav-link text-white ")
          : "";
        smsReportingSelect
          ? smsReportingSelect.setAttribute("class", "nav-link text-white ")
          : "";
        recMsgSelect
          ? recMsgSelect.setAttribute("class", "nav-link text-white ")
          : "";
      }
    } else if (cond == "smsReporting") {
      if (smsReporting.style.display == "flex") {
        smsReporting ? (smsReporting.style.display = "none") : "";
      } else {
        smsReporting ? (smsReporting.style.display = "flex") : "";
        sms ? (sms.style.display = "none") : "";
        smsPlus ? (smsPlus.style.display = "none") : "";
        recMsg ? (recMsg.style.display = "none") : "";
        televoting ? (televoting.style.display = "none") : "";
        smsReportingSelect
          ? smsReportingSelect.setAttribute(
              "class",
              "nav-link text-white active"
            )
          : "";
        smsSelect
          ? smsSelect.setAttribute("class", "nav-link text-white ")
          : "";
        televotingSelect
          ? televotingSelect.setAttribute("class", "nav-link text-white ")
          : "";
        smsPlusSelect
          ? smsPlusSelect.setAttribute("class", "nav-link text-white ")
          : "";
        recMsgSelect
          ? recMsgSelect.setAttribute("class", "nav-link text-white ")
          : "";
      }
    } else if (cond == "televoting") {
      if (televoting.style.display == "flex") {
        televoting ? (televoting.style.display = "none") : "";
      } else {
        televoting ? (televoting.style.display = "flex") : "";
        sms ? (sms.style.display = "none") : "";
        smsPlus ? (smsPlus.style.display = "none") : "";
        recMsg ? (recMsg.style.display = "none") : "";
        smsReporting ? (smsReporting.style.display = "none") : "";
        televotingSelect
          ? televotingSelect.setAttribute(
              "class",
              "nav-link text-white test active"
            )
          : "";
        smsReportingSelect
          ? smsReportingSelect.setAttribute("class", "nav-link text-white ")
          : "";
        smsSelect
          ? smsSelect.setAttribute("class", "nav-link text-white ")
          : "";
        smsPlusSelect
          ? smsPlusSelect.setAttribute("class", "nav-link text-white ")
          : "";
        recMsgSelect
          ? recMsgSelect.setAttribute("class", "nav-link text-white ")
          : "";
      }
    } else if (cond == "recMsg") {
      if (recMsg.style.display == "flex") {
        recMsg ? (recMsg.style.display = "none") : "";
      } else {
        recMsg ? (recMsg.style.display = "flex") : "";
        televoting ? (televoting.style.display = "none") : "";
        sms ? (sms.style.display = "none") : "";
        smsPlus ? (smsPlus.style.display = "none") : "";
        smsReporting ? (smsReporting.style.display = "none") : "";
        recMsgSelect
          ? recMsgSelect.setAttribute("class", "nav-link text-white active")
          : "";
        televotingSelect
          ? televotingSelect.setAttribute("class", "nav-link text-white ")
          : "";
        smsReportingSelect
          ? smsReportingSelect.setAttribute("class", "nav-link text-white ")
          : "";
        smsSelect
          ? smsSelect.setAttribute("class", "nav-link text-white ")
          : "";
        smsPlusSelect
          ? smsPlusSelect.setAttribute("class", "nav-link text-white ")
          : "";
      }
    } else if (cond == "") {
      smsPlus.style.display = "none";
      sms.style.display = "none";
      smsReporting.style.display = "none";
      televoting.style.display = "none";
      recMsg.style.display = "none";
      // smsReportingSelect.setAttribute("class", "nav-link text-white");
      // smsPlusSelect.setAttribute("class", "nav-link text-white ");
      // recMsgSelect.setAttribute("class", "nav-link text-white ");
      // televotingSelect.setAttribute("class", "nav-link text-white ");
      // smsSelect.setAttribute("class", "nav-link text-white ");
    }
  }
  
  
  
  /**
   * our function to call the API to get the error messages
   */
  checkUserServices() {
    this.Jarwis.checkUserServices().subscribe(
      (data) => this.handleData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleData(data) {
    data.data.forEach((element) => {
      if (
        element.Service.name.split(" ")[0] != "SMS" &&
        element.Service.name != "Televoting"
      ) {
        this.smsFlag = true;
        this.smsReportingFlag = true;
        if (element.Service.name.split(" ")[0] == "Single") {
          this.sidePanelInfo.singleSms = element.Service.name.split(" ")[0];
        } else if (element.Service.name.split(" ")[0] == "Bulk") {
          this.sidePanelInfo.bulkSms = element.Service.name.split(" ")[0];
        } else if (element.Service.name.split(" ")[0] == "Campaigns") {
          this.sidePanelInfo.campaigns = element.Service.name.split(" ")[0];
        }
      }
      if (element.Service.name.split(" ")[0] == "SMS") {
        this.smsPlusFlag = true;
        this.othersReceivedMessagesFlag = true;
        this.sidePanelInfo.smsPlus = element.Service.name.split(" ")[0];
        this.sidePanelInfo.othersReceivedMessages =
          element.Service.name.split(" ")[0];
      }
      if (element.Service.name == "Televoting") {
        this.othersReceivedMessagesFlag = true;
        this.televotingFlag = true;
        this.sidePanelInfo.televoting = element.Service.name;
        this.sidePanelInfo.othersReceivedMessages = element.Service.name;
      }
    });
    this.hideShow("");
  }
  /**
   * handle error is our function to handle error given by APi or custom made
   * @param error is the variable through which we recieve the error to display to the user
   */
  handleError(error) {}
  /**
   * this is our function to navigate in our app according to the user
   * @param name string name of the component to be routed to
   */
  navigate(name) {
    this.router.navigateByUrl("/side-panel/" + name);
  }

  sideBar() {
    if (this.showFlag == true) {
      this.showFlag = false;
    } else if (this.showFlag == false) {
      this.showFlag = true;
    }
  }
  // @ViewChild("drawer") drawer: MatSidenav;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (event.target.innerWidth <= 768) {
      this.showFlag = false;
    }
    if (event.target.innerWidth >= 770) {
      this.showFlag = true;
    }
  }
}
