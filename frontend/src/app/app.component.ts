import { Component } from "@angular/core";
/**
 * this is the components file of our app
 */
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  /**
   * this is a boolean type variable
   */
  isCollapsed = false;
}
