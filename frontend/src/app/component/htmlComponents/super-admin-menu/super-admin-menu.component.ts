import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-super-admin-menu",
  templateUrl: "./super-admin-menu.component.html",
  styleUrls: ["./super-admin-menu.component.css"],
})
export class SuperAdminMenuComponent implements OnInit {
  /**
   * This is the constructor of our component
   */
  showFlag: boolean = true;
  screenSize: number;
  constructor(public router: Router) {}
  /**
   * This is our life cycle hook that runs when our component loads and it creates an array
   */
  ngOnInit(): void {
    this.hideShow("adminManagement");
  }
  ngAfterViewInit() {
    this.screenSize = window.innerWidth;
    if (this.screenSize <= 769) {
      this.showFlag = false;
    }
    if (this.screenSize >= 770) {
      this.showFlag = true;
    }
  }
  /**
   * function to manipulate super admin menu
   * @param cond conditions to manupulate
   */
  hideShow(cond) {
    let adminManagement = document.getElementById("adminManagement");
    let smscManagement = document.getElementById("smscManagement");
    let shortCodeRequests = document.getElementById("shortCodeRequests");
    adminManagement.style.transform = ".5s linear";
    shortCodeRequests.style.transform = ".5s linear";
    let adminManagementSelect = document.getElementById(
      "adminManagementSelect"
    );
    let smscManagementSelect = document.getElementById("smscManagementSelect");
    let shortCodeRequestsSelect = document.getElementById(
      "shortCodeRequestsSelect"
    );
    if (cond == "adminManagement") {
      if (adminManagement.style.display == "flex") {
        adminManagement.style.display = "none";
      } else {
        adminManagement.style.display = "flex";
        shortCodeRequests.style.display = "none";
        smscManagement.style.display = "none";
        adminManagementSelect.setAttribute(
          "class",
          "nav-link text-white active"
        );
        shortCodeRequestsSelect.setAttribute("class", "nav-link text-white ");
        smscManagementSelect.setAttribute("class", "nav-link text-white");
      }
    } else if (cond == "smscManagement") {
      if (smscManagement.style.display == "flex") {
        smscManagement.style.display = "none";
      } else {
        smscManagement.style.display = "flex";
        shortCodeRequests.style.display = "none";
        adminManagement.style.display = "none";
        smscManagementSelect.setAttribute(
          "class",
          "nav-link text-white active"
        );
        shortCodeRequestsSelect.setAttribute("class", "nav-link text-white ");
        adminManagementSelect.setAttribute("class", "nav-link text-white ");
      }
    } else if (cond == "shortCodeRequests") {
      if (shortCodeRequests.style.display == "flex") {
        shortCodeRequests.style.display = "none";
      } else {
        shortCodeRequests.style.display = "flex";
        adminManagement.style.display = "none";
        smscManagement.style.display = "none";
        shortCodeRequestsSelect.setAttribute(
          "class",
          "nav-link text-white active"
        );
        smscManagementSelect.setAttribute("class", "nav-link text-white");
        adminManagementSelect.setAttribute("class", "nav-link text-white ");
      }
    }
  }
  /**
   * router function
   * @param name path of the component
   */
  navigate(name) {
    // this.router.navigateByUrl("/side-panel/" + name);
  }
  sideBar() {
    if (this.showFlag == true) {
      this.showFlag = false;
    } else if (this.showFlag == false) {
      this.showFlag = true;
    }
  }
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
