/**
 * THIS IS SMS PLUS COMPONENT
 */
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { TableInfo } from "src/app/component/componentModel/table-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-sms-plus",
  templateUrl: "./sms-plus.component.html",
  styleUrls: ["./sms-plus.component.css"],
})
export class SmsPlusComponent implements OnInit {
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {}
}
