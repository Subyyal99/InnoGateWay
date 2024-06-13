import { Component, OnInit } from "@angular/core";
/**
 * This is our component file of client navigation
 */
@Component({
  selector: "app-client-navigation",
  templateUrl: "./client-navigation.component.html",
  styleUrls: ["./client-navigation.component.css"],
})
export class ClientNavigationComponent implements OnInit {
  /**
   * This is a variable of boolean type
   */
  isCollapsed = false;
  /**
   * Default constructor of admin navigation
   */
  constructor() {}
  /**
   * This function is implemented by the admin navigation component class
   */
  ngOnInit(): void {}
}
