import { Component, OnInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";
/**
 * This is the component class of our component
 */
@Component({
  selector: "app-admin-slide-menu",
  templateUrl: "./admin-slide-menu.component.html",
  styleUrls: ["./admin-slide-menu.component.css"],
})
export class AdminSlideMenuComponent implements OnInit {
  showFlag: boolean = true;
  screenSize: number;

  /**
   * This is the constructor of our component
   */
  constructor(public router: Router) {}
  /**
   * This is our life cycle hook that runs when our component loads and it creates an array
   */
  ngOnInit(): void {
    // let dashBoard = document.getElementById("dashSelect");
    // dashBoard.setAttribute("class", "nav-link text-white active");
    this.hideShow("userManagement");
  }
  ngAfterViewInit() {
    this.screenSize = window.innerWidth;
    if (this.screenSize <= 768) {
      this.showFlag = false;
    }
    if (this.screenSize >= 770) {
      this.showFlag = true;
    }
  }
  /**
   * this function changes the display and style of the side panel
   * @param cond conditions of the sidepanel
   */
  hideShow(cond) {
    let userManagement = document.getElementById("userManagement");
    let dataManagement = document.getElementById("dataManagement");
    userManagement.style.transform = ".5s linear";
    let rpt = document.getElementById("rpt");
    let rptSelect = document.getElementById("rptSelect");
    let userManagementSelect = document.getElementById("userManagementSelect");
    let dataManagementSelect = document.getElementById("dataManagementSelect");

    if (cond == "userManagement") {
      if (userManagement.style.display == "flex") {
        userManagement.style.display = "none";
      } else {
        userManagement.style.display = "flex";
        dataManagement.style.display = "none";
        rpt.style.display = "none";
        userManagementSelect.setAttribute(
          "class",
          "nav-link text-white active"
        );
        rptSelect.setAttribute("class", "nav-link text-white ");
        dataManagementSelect.setAttribute("class", "nav-link text-white ");
      }
    } else if (cond == "dataManagement") {
      if (dataManagement.style.display == "flex") {
        dataManagement.style.display = "none";
      } else {
        dataManagement.style.display = "flex";
        rpt.style.display = "none";
        userManagement.style.display = "none";
        rptSelect.setAttribute("class", "nav-link text-white ");
        userManagementSelect.setAttribute("class", "nav-link text-white ");
        dataManagementSelect.setAttribute(
          "class",
          "nav-link text-whiteactive active"
        );
      }
    } else if (cond == "rpt") {
      if (rpt.style.display == "flex") {
        rpt.style.display = "none";
      } else {
        userManagement.style.display = "none";
        dataManagement.style.display = "none";
        rpt.style.display = "flex";
        rptSelect.setAttribute("class", "nav-link text-white active");
        userManagementSelect.setAttribute("class", "nav-link text-white ");
        dataManagementSelect.setAttribute("class", "nav-link text-white ");
      }
    }
  }
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
