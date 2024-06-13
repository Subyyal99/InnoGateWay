import { Component, OnInit, AfterViewInit, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/auth/token-storage.service";
/**
 * This is the components file of our staff navigation
 */
@Component({
  selector: "app-staff-navigation",
  templateUrl: "./staff-navigation.component.html",
  styleUrls: ["./staff-navigation.component.css"],
})
export class StaffNavigationComponent implements OnInit, AfterViewInit {
  /**
   * This is our default constructor with parameters
   * @param elementRef it is a parameter of a wrapper around a native element inside of a View.
   * @param router it is a para meter for raouting and navigation
   * @param tokenStorage it is the parameter of token storage for user data
   */
  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}
  /**
   * This function is implemented by the staff navigation component class and it changes the background color.
   */
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "#ffffff";
  }
  /**
   * This function is used to log out the user from our program
   */
  logOut() {
    this.tokenStorage.signOut();
    this.router.navigate([""]);
  }
  /**
   * This function is used to reload a page
   */
  reloadPage() {
    window.location.reload();
  }
  /**
   * This function is implemented by the staff navigation component class
   */
  ngOnInit() {}
}
