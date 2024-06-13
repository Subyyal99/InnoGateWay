import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ButtonComponent } from "./component/htmlComponents/button/button.component";
import { InputChipsSpecialComponent } from "./component/htmlComponents/input-chips-special/input-chips-special.component";
import { LineChartComponent } from "./component/htmlComponents/line-chart/line-chart.component";
import { SidePanelComponent } from "./component/htmlComponents/side-panel/side-panel.component";
import { TextBoxComponent } from "./component/htmlComponents/text-box/text-box.component";
import { AdminGuard } from "./guards/admin.guard";
import { AuthGuard } from "./guards/auth.guard";
import { ClientGuard } from "./guards/client.guard";
import { NotLoggedInGuard } from "./guards/not-logged-in.guard";
import { SuperAdminGuard } from "./guards/super-admin.guard";
import { AddClientComponent } from "./modules/admin/add-client/add-client.component";
import { EditClientsComponent } from "./modules/admin/edit-clients/edit-clients.component";
import { LogsComponent } from "./modules/admin/logs/logs.component";
import { ManageClientsComponent } from "./modules/admin/manage-clients/manage-clients.component";
import { ServicesComponent } from "./modules/admin/services/services.component";
import { ShortCodeApprovalComponent } from "./modules/admin/short-code-approval/short-code-approval.component";
import { AdminNavigationComponent } from "./modules/navigations/admin-navigation/admin-navigation.component";
import { ClientNavigationComponent } from "./modules/navigations/client-navigation/client-navigation.component";
import { SuperNavigationComponent } from "./modules/navigations/super-navigation/super-navigation.component";
import { ReceivedMessageComponent } from "./modules/received-message/recieved-message/received-message.component";
import { AddPartnersComponent } from "./modules/shared/sharedPages/add-partners/add-partners.component";
import { AddServicesComponent } from "./modules/shared/sharedPages/add-services/add-services.component";
import { ByIpComponent } from "./modules/shared/sharedPages/blacklist/by-ip/by-ip.component";
import { ByMsisdnComponent } from "./modules/shared/sharedPages/blacklist/by-msisdn/by-msisdn.component";
import { BulkSmsReportingComponent } from "./modules/shared/sharedPages/bulk-sms-reporting/bulk-sms-reporting.component";
import { BulkSmsComponent } from "./modules/shared/sharedPages/bulk-sms/bulk-sms.component";
import { CampaignReportingComponent } from "./modules/shared/sharedPages/campaign-reporting/campaign-reporting.component";
import { CampaignWhatComponent } from "./modules/shared/sharedPages/campaign-what/campaign-what.component";
import { CampaignWhenComponent } from "./modules/shared/sharedPages/campaign-when/campaign-when.component";
import { CampaignWhoComponent } from "./modules/shared/sharedPages/campaign-who/campaign-who.component";
import { ContactListsComponent } from "./modules/shared/sharedPages/contact-lists/contact-lists.component";
import { SpreadsheetDetailsComponent } from "./modules/shared/sharedPages/contact-lists/Import/spreadsheet-details/spreadsheet-details.component";
import { UploadFileComponent } from "./modules/shared/sharedPages/contact-lists/Import/upload-file/upload-file.component";
import { SearchComponent } from "./modules/shared/sharedPages/contact-lists/search/search.component";
import { CreateCampaignComponent } from "./modules/shared/sharedPages/create-campaign/create-campaign.component";
import { CreateNewContactListComponent } from "./modules/shared/sharedPages/create-new-contact-list/create-new-contact-list.component";
import { DashboardComponent } from "./modules/shared/sharedPages/dashboard/dashboard.component";
import { ForgotPasswordComponent } from "./modules/shared/sharedPages/forgot-password/forgot-password.component";
import { LoginComponent } from "./modules/shared/sharedPages/login/login.component";
import { MergeSendComponent } from "./modules/shared/sharedPages/merge-send/merge-send.component";
import { ResetPasswordComponent } from "./modules/shared/sharedPages/reset-password/reset-password.component";
import { SingleSmsReportingComponent } from "./modules/shared/sharedPages/single-sms-reporting/single-sms-reporting.component";
import { SingleSmsComponent } from "./modules/shared/sharedPages/single-sms/single-sms.component";
import { TestAndConfirmComponent } from "./modules/shared/sharedPages/test-and-confirm/test-and-confirm.component";
import { VerifyEmailAccountComponent } from "./modules/shared/sharedPages/verify-email-account/verify-email-account.component";
import { BalanceDeductionComponent } from "./modules/sms-plus/balance-deduction/balance-deduction.component";
import { CheckKeywordComponent } from "./modules/sms-plus/check-keyword/check-keyword.component";
import { MessageDetailsComponent } from "./modules/sms-plus/message-details/message-details.component";
import { MessageSuccessComponent } from "./modules/sms-plus/message-success/message-success.component";
import { ReceivedMessagesComponent } from "./modules/sms-plus/received-messages/received-messages.component";
import { SentMessageComponent } from "./modules/sms-plus/sent-message/sent-message.component";
import { SmsPlusDashboardComponent } from "./modules/sms-plus/sms-plus-dashboard/sms-plus-dashboard.component";
import { SmsPlusErrorsComponent } from "./modules/sms-plus/sms-plus-errors/sms-plus-errors.component";
import { SmsPlusComponent } from "./modules/sms-plus/sms-plus.component";
import { AddAdminComponent } from "./modules/super-admin/add-admin/add-admin.component";
import { AddSmscComponent } from "./modules/super-admin/add-smsc/add-smsc.component";
import { EditAdminComponent } from "./modules/super-admin/edit-admin/edit-admin.component";
import { ManageAdminComponent } from "./modules/super-admin/manage-admin/manage-admin.component";
import { ShortCodeApprovalRequestComponent } from "./modules/super-admin/short-code-approval-request/short-code-approval-request.component";
import { ShortCodeRequestDetailsComponent } from "./modules/super-admin/short-code-request-details/short-code-request-details.component";
import { ShortCodeRequestStatusComponent } from "./modules/super-admin/short-code-request-status/short-code-request-status.component";
import { SmscComponent } from "./modules/super-admin/smsc/smsc.component";
import { TBalanceDeductionComponent } from "./modules/televoting/t-balance-deduction/t-balance-deduction.component";
import { TCheckKeywordComponent } from "./modules/televoting/t-check-keyword/t-check-keyword.component";
import { TMessageDetailsComponent } from "./modules/televoting/t-message-details/t-message-details.component";
import { TMessageSuccessComponent } from "./modules/televoting/t-message-success/t-message-success.component";
import { TReceivedMessagesComponent } from "./modules/televoting/t-received-messages/t-received-messages.component";
import { TSentMessageComponent } from "./modules/televoting/t-sent-message/t-sent-message.component";
import { TelevotingDashboardComponent } from "./modules/televoting/televoting-dashboard/televoting-dashboard.component";
import { TelevotingErrorsComponent } from "./modules/televoting/televoting-errors/televoting-errors.component";
import { TelevotingComponent } from "./modules/televoting/televoting.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent, canActivate: [AuthGuard] },
  { path: "button", component: ButtonComponent },
  { path: "ics", component: InputChipsSpecialComponent },
  { path: "text-box", component: TextBoxComponent },
  { path: "account/verify-email", component: VerifyEmailAccountComponent },
  { path: "account/reset-password", component: ResetPasswordComponent },
  { path: "account/forgot-password", component: ForgotPasswordComponent },
  { path: "add-partners", component: AddPartnersComponent },
  { path: "add-services", component: AddServicesComponent },

  {
    path: "side-panel",
    component: SidePanelComponent,
    canActivate: [ClientGuard],
    children: [
      {
        path: "mergeSend",
        component: MergeSendComponent,
        canActivate: [ClientGuard],
      },
      {
        path: "sms-dashboard",
        component: DashboardComponent,
        canActivate: [ClientGuard],
      },
      {
        path: "single-sms",
        component: SingleSmsComponent,
        canActivate: [ClientGuard],
      },
      {
        path: "single-sms-reporting",
        component: SingleSmsReportingComponent,
        canActivate: [ClientGuard],
      },
      {
        path: "bulk-sms",
        component: BulkSmsComponent,
        canActivate: [ClientGuard],
      },
      {
        path: "bulk-sms-reporting",
        component: BulkSmsReportingComponent,
        canActivate: [ClientGuard],
      },
      {
        path: "create-campaign",
        component: CreateCampaignComponent,
        canActivate: [ClientGuard],
      },
      {
        path: "campaign-who",
        component: CampaignWhoComponent,
        canActivate: [ClientGuard],
      },
      {
        path: "campaign-what",
        component: CampaignWhatComponent,
        canActivate: [ClientGuard],
      },
      {
        path: "campaign-when",
        component: CampaignWhenComponent,
        canActivate: [ClientGuard],
      },
      {
        path: "test-and-confirm",
        component: TestAndConfirmComponent,
        canActivate: [ClientGuard],
      },
      {
        path: "campaign-reporting",
        component: CampaignReportingComponent,
        canActivate: [ClientGuard],
      },
      {
        path: "contact-lists",
        component: ContactListsComponent,
        canActivate: [ClientGuard],
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [ClientGuard],
      },

      {
        path: "upload-file",
        component: UploadFileComponent,
        canActivate: [ClientGuard],
      },
      {
        path: "spreadsheet-preview",
        component: SpreadsheetDetailsComponent,
        canActivate: [ClientGuard],
      },
      {
        path: "search",
        component: SearchComponent,
        canActivate: [ClientGuard],
      },
      {
        path: "sms-plus",
        component: SmsPlusComponent,
        canActivate: [ClientGuard],
        children: [
          {
            path: "",
            redirectTo: "smsPlus-dashboard",
            pathMatch: "full",
          },
          {
            path: "smsPlus-dashboard",
            component: SmsPlusDashboardComponent,
            canActivate: [ClientGuard],
          },
          {
            path: "received-messages",
            component: ReceivedMessagesComponent,
            canActivate: [ClientGuard],
          },
          {
            path: "check-keyword",
            component: CheckKeywordComponent,
            canActivate: [ClientGuard],
          },
          {
            path: "graph",
            component: LineChartComponent,
            canActivate: [ClientGuard],
          },
          {
            path: "balance-deduction",
            component: BalanceDeductionComponent,
            canActivate: [ClientGuard],
          },
          {
            path: "successful-message",
            component: MessageSuccessComponent,
            canActivate: [ClientGuard],
          },

          {
            path: "sent-message",
            component: SentMessageComponent,
            canActivate: [ClientGuard],
          },
          {
            path: "message-detail",
            component: MessageDetailsComponent,
            canActivate: [ClientGuard],
          },
          {
            path: "error-messages",
            component: SmsPlusErrorsComponent,
            canActivate: [NotLoggedInGuard, ClientGuard],
          },
        ],
      },
      {
        path: "televoting",
        component: TelevotingComponent,
        children: [
          {
            path: "",
            redirectTo: "televoting-dashboard",
            pathMatch: "full",
          },
          {
            path: "televoting-dashboard",
            component: TelevotingDashboardComponent,
            canActivate: [ClientGuard],
          },
          {
            path: "received-messages",
            component: TReceivedMessagesComponent,
            canActivate: [NotLoggedInGuard, ClientGuard],
          },
          {
            path: "check-keyword",
            component: TCheckKeywordComponent,
            canActivate: [NotLoggedInGuard, ClientGuard],
          },
          {
            path: "balance-deduction",
            component: TBalanceDeductionComponent,
            canActivate: [NotLoggedInGuard, ClientGuard],
          },
          {
            path: "successful-message",
            component: TMessageSuccessComponent,
            canActivate: [NotLoggedInGuard, ClientGuard],
          },
          {
            path: "sent-message",
            component: TSentMessageComponent,
            canActivate: [NotLoggedInGuard, ClientGuard],
          },
          {
            path: "message-detail",
            component: TMessageDetailsComponent,
            canActivate: [ClientGuard],
          },
          {
            path: "error-messages",
            component: TelevotingErrorsComponent,
            canActivate: [NotLoggedInGuard, ClientGuard],
          },
        ],
      },
      {
        path: "received-message",
        component: ReceivedMessageComponent,
        canActivate: [NotLoggedInGuard, ClientGuard],
      },
      {
        path: "create-new-contact-list",
        component: CreateNewContactListComponent,
        canActivate: [NotLoggedInGuard, ClientGuard],
      },
    ],
  },
  {
    path: "super-admin",
    component: SuperNavigationComponent,
    canActivate: [SuperAdminGuard],
    children: [
      {
        path: "",
        redirectTo: "add-admin",
        pathMatch: "full",
      },
      {
        path: "add-admin",
        component: AddAdminComponent,
        canActivate: [SuperAdminGuard],
      },
      {
        path: "add-smsc",
        component: AddSmscComponent,
        canActivate: [SuperAdminGuard],
      },
      {
        path: "manage-admin",
        component: ManageAdminComponent,
        canActivate: [SuperAdminGuard],
      },
      {
        path: "edit-admin",
        component: EditAdminComponent,
        canActivate: [SuperAdminGuard],
      },
      {
        path: "edit-smsc",
        component: SmscComponent,
        canActivate: [SuperAdminGuard],
      },
      {
        path: "short-code-approval-requests",
        component: ShortCodeApprovalRequestComponent,
        canActivate: [SuperAdminGuard],
      },
      {
        path: "short-code-request-details",
        component: ShortCodeRequestDetailsComponent,
        canActivate: [SuperAdminGuard],
      },
      {
        path: "short-code-request-status",
        component: ShortCodeRequestStatusComponent,
        canActivate: [SuperAdminGuard],
      },
    ],
  },
  {
    path: "admin",
    component: AdminNavigationComponent,
    canActivate: [AdminGuard],

    children: [
      {
        path: "",
        redirectTo: "add-client",
        pathMatch: "full",
      },
      {
        path: "add-client",
        component: AddClientComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "manage-client",
        component: ManageClientsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "edit-client",
        component: EditClientsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "edit-service",
        component: ServicesComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "add-shortCode",
        component: ShortCodeApprovalComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "by-ip",
        component: ByIpComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "by-msisdn",
        component: ByMsisdnComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "logs",
        component: LogsComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
  {
    path: "client",
    component: ClientNavigationComponent,
    children: [],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: "legacy",
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
