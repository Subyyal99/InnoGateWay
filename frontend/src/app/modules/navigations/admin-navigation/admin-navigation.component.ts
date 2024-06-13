import { Component, OnInit } from "@angular/core";
/**
 * This is our component file of admin navigation
 */
@Component({
  selector: "app-admin-navigation",
  templateUrl: "./admin-navigation.component.html",
  styleUrls: ["./admin-navigation.component.css"],
})
export class AdminNavigationComponent implements OnInit {
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
