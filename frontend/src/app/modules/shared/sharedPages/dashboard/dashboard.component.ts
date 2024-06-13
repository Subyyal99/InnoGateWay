import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { SmsDashboardInfo } from "src/app/models/sms-dashboard-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  /**
   * this SmsDashboardInfo type object stores values required for dashboard
   */
  smsDashboardInfo = new SmsDashboardInfo();
  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param Jarwis This connects Backend with Frontend
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param messageService is a message type variable created to display messages in our component
   */
  constructor(
    private router: Router,
    private messageService: MessageService,
    private Jarwis: AuthService
  ) {}
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    this.getAllMessageCounts();
  }
  /**
   * our function to call the API to get templates
   */
  getAllMessageCounts() {
    this.Jarwis.getMessageCounts().subscribe(
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
      if (element.type == "available") {
        this.smsDashboardInfo[element.name][element.type] = element.value;
      } else if (element.type == "sent") {
        this.smsDashboardInfo[element.name][element.type] = element.value;
      }
    });
  }
  /**
   * handle error is our function to handle error given by APi or custom made
   * @param error is the variable through which we recieve the error to display to the user
   */
  handleError(error) {}
  /**
   * this function is used to navigate among the page
   * @param data path to navigate to
   */
  route(data) {
    this.router.navigateByUrl("/side-panel/" + data);
  }
}
