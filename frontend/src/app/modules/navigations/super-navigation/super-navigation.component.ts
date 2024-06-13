import { Component, OnInit } from "@angular/core";
/**
 * This is our component file of super navigation
 */
@Component({
  selector: "app-super-navigation",
  templateUrl: "./super-navigation.component.html",
  styleUrls: ["./super-navigation.component.css"],
})
export class SuperNavigationComponent implements OnInit {
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
