/**
 * This is our client tiered menu component, to be used through out our program
 */
import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
/**
 * This is the component class of our component
 */
@Component({
  selector: "app-client-tiered-menu",
  templateUrl: "./client-tiered-menu.component.html",
  styleUrls: ["./client-tiered-menu.component.css"],
})
export class ClientTieredMenuComponent implements OnInit {
  /**
   * This is an initialization of an  array of the type MenuItem
   */
  items: MenuItem[];
  /**
   * This is the constructor of our component
   */
  constructor() {}
  /**
   * This is our life cycle hook that runs when our component loads and it creates an array
   */
  ngOnInit(): void {
    this.items = [
      {
        label: "Dashboard Analytics",
      },
      {
        label: "Manage Clients Role",

        items: [
          { label: "Create Clients" },
          { label: "Client Requests" },
          { label: "Clients" },
          { label: "Subscriptions" },
          { label: "Other Subscriptions" },
        ],
      },
      {
        label: "Whitelisting/Blacklisting",
        items: [
          { label: "API URL Whitelisting" },
          { label: "IP Whitelisting" },
          { label: "Email Whitelisting" },
          { label: "URL Whitelisting" },
        ],
      },
      {
        label: "Spam/Filtering",
      },
      {
        label: "Logs",
        items: [
          { label: "MT Outgoing (SMS)" },
          { label: "MT Incoming (SMS)" },
          { label: "Statistics" },
          { label: "Monitoring" },
          { label: "Reports" },
          { label: "Keyword/Numbers" },
          { label: "SMS Reports" },
        ],
      },
      {
        label: "Manage SMSC",

        items: [{ label: "Add SMSC" }, { label: "SMSC Management" }],
      },
      {
        label: "Wallet",

        items: [
          { label: "Top Up" },
          { label: "Balance Tracking Client" },
          {
            label: "Transaction",
            items: [
              { label: "Billing Transaction" },
              { label: "Billing Invoices" },
            ],
          },
        ],
      },
      {
        label: "Packages",

        items: [
          { label: "Make Custom Packages" },
          { label: "Package Management" },
          { label: "Assign Packages" },
          { label: "Package Tracking" },
        ],
      },
      {
        label: "SMS Summary",

        items: [
          { label: "Outgoing" },
          { label: "Incoming" },
          { label: "In queue" },
        ],
      },
      {
        label: "DLT",
      },
      {
        label: "Reports",
      },
      {
        label: "Settings",
      },
    ];
  }
}
