import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { TableInfo } from "src/app/component/componentModel/table-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-create-campaign",
  templateUrl: "./create-campaign.component.html",
  styleUrls: ["./create-campaign.component.css"],
})
export class CreateCampaignComponent implements OnInit {
  /**
   * existing campaign flag
   */
  campaignFlag = false;
  /**
   * info to display in table
   */
  tableInfo: TableInfo[] = [];
  /**
   * header of the table
   */
  tableHeaders = [
    {
      field: "name",
      header: "Name",
      type: "text",
      edit: "false",
      report: "true",
    },
    {
      field: "status",
      header: "Status ",
      type: "text",
      edit: "false",
      justDelete: "false",
    },
    {
      field: "action",
      header: "Action",
      type: "editButton",
      edit: "false",
      justDelete: "false",
    },
  ];
  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param Jarwis This connects Backend with Frontend
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param messageService is a message type variable created to display messages in our component
   */
  constructor(
    private Jarwis: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    this.getCampaigns();
  }
  /**
   * our function to call the API to get templates
   */
  getCampaigns() {
    this.Jarwis.getCampaigns().subscribe(
      (data) => this.handleCampaignsData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleCampaignsData(data) {
    if (data.data && data.data.length > 0) {
      this.campaignFlag = true;
      this.tableInfo = [];
      data.data.forEach((item) => {
        let obj = new TableInfo();
        obj.name = item.campaignName;
        obj.id = item.id;
        obj.status = item.status;
        this.tableInfo.push(obj);
      });
    }
  }
  /**
   * handle error is our function to handle error given by APi or custom made
   * @param error is the variable through which we recieve the error to display to the user
   */
  handleError(error) {
    this.addMessages(
      "error",
      "Error",
      error.error.message ? error.error.message : error.message
    );
  }
  /**
   * this navigates to the creation of campaign page
   */
  createCampaign() {
    this.router.navigateByUrl("/side-panel/campaign-who");
  }
  /**
   * gets called on edit of table
   * @param id this is the id of the row to be editted
   */
  onEdit(id) {
    this.router.navigate(["/side-panel/campaign-who"], {
      queryParams: { id: id },
    });
  }
  /**
   * this navigates us to campaign reporting page
   * @param data data required in the link for the next page
   */
  onReport(data) {
    this.router.navigate(["/side-panel/campaign-reporting"], {
      queryParams: { id: data.id, name: data.name },
    });
  }
  /**
   * gets called when we delete an entry
   * @param data data of the row to be deleted
   */
  onDelete(data) {}
  /**
   * this is our function to call the message service to display our required message
   * @param severity defines the type/severity of the message to be displayed
   * @param summary defines the summary of the message
   * @param detail contains the string of the message to be displayed
   */
  addMessages(severity, summary, detail) {
    this.messageService.clear();
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      sticky: true,
    });
    setTimeout(() => {
      this.messageService.clear();
    }, 3000);
  }
}
