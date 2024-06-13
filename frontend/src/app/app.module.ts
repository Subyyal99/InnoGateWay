import { RouterModule } from "@angular/router";
import { CustomMaterialModule } from "./core/material.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LayoutModule } from "@angular/cdk/layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtModule } from "@auth0/angular-jwt";
import { StaffNavigationComponent } from "./staffPanel/staff-navigation/staff-navigation.component";
import { IconsProviderModule } from "./icons-provider.module";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { SuperNavigationComponent } from "./modules/navigations/super-navigation/super-navigation.component";
import { AdminNavigationComponent } from "./modules/navigations/admin-navigation/admin-navigation.component";
import { ClientNavigationComponent } from "./modules/navigations/client-navigation/client-navigation.component";
import { LoginComponent } from "./modules/shared/sharedPages/login/login.component";
import { ButtonComponent } from "./component/htmlComponents/button/button.component";
import { TextBoxComponent } from "./component/htmlComponents/text-box/text-box.component";
import { CapitalizationPipe } from "src/Pipes/camelCaseToCapitalization.pipe";
import { SignUpComponent } from "./modules/shared/sharedPages/sign-up/sign-up.component";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LinkButtonComponent } from "./component/htmlComponents/link-button/link-button.component";
import { VerifyEmailAccountComponent } from "./modules/shared/sharedPages/verify-email-account/verify-email-account.component";
import { ResetPasswordComponent } from "./modules/shared/sharedPages/reset-password/reset-password.component";
import { SidePanelComponent } from "./component/htmlComponents/side-panel/side-panel.component";
import { AdminSlideMenuComponent } from "./component/htmlComponents/admin-slide-menu/admin-slide-menu.component";
import { ClientTieredMenuComponent } from "./component/htmlComponents/client-tiered-menu/client-tiered-menu.component";
import { ForgotPasswordComponent } from "./modules/shared/sharedPages/forgot-password/forgot-password.component";
import { MessageService } from "primeng/api";
import { SidenavModule } from "angular-ng-sidenav";
import { MergeSendComponent } from "./modules/shared/sharedPages/merge-send/merge-send.component";
import { DashboardComponent } from "./modules/shared/sharedPages/dashboard/dashboard.component";
import { DropDownComponent } from "./component/htmlComponents/drop-down/drop-down.component";
import { CampaignWhatComponent } from "./modules/shared/sharedPages/campaign-what/campaign-what.component";
import { TextAreaComponent } from "./component/htmlComponents/text-area/text-area.component";
import { CampaignWhoComponent } from "./modules/shared/sharedPages/campaign-who/campaign-who.component";
import { MultiSelectComponent } from "./component/htmlComponents/multi-select/multi-select.component";
import { SplitButtonComponent } from "./component/htmlComponents/split-button/split-button.component";
import { CampaignWhenComponent } from "./modules/shared/sharedPages/campaign-when/campaign-when.component";
import { TestAndConfirmComponent } from "./modules/shared/sharedPages/test-and-confirm/test-and-confirm.component";
import { SelectButtonComponent } from "./component/htmlComponents/select-button/select-button.component";
import { HeaderComponent } from "./modules/shared/sharedPages/header/header.component";
import { CreateCampaignComponent } from "./modules/shared/sharedPages/create-campaign/create-campaign.component";
import { CheckBoxComponent } from "./component/htmlComponents/check-box/check-box.component";
import { TextIconButtonComponent } from "./component/htmlComponents/text-icon-button/text-icon-button.component";
import { ContactListsComponent } from "./modules/shared/sharedPages/contact-lists/contact-lists.component";
import { AddPartnersComponent } from "./modules/shared/sharedPages/add-partners/add-partners.component";
import { AddServicesComponent } from "./modules/shared/sharedPages/add-services/add-services.component";
import { SingleSmsComponent } from "./modules/shared/sharedPages/single-sms/single-sms.component";
import { CreateNewContactListComponent } from "./modules/shared/sharedPages/create-new-contact-list/create-new-contact-list.component";
import { InputTableComponent } from "./component/htmlComponents/input-table/input-table.component";
import { InputChipsSpecialComponent } from "./component/htmlComponents/input-chips-special/input-chips-special.component";
import { BulkSmsComponent } from "./modules/shared/sharedPages/bulk-sms/bulk-sms.component";
import { UploadFileComponent } from "./modules/shared/sharedPages/contact-lists/Import/upload-file/upload-file.component";
import { TableComponent } from "./component/htmlComponents/table/table.component";
import { ByIpComponent } from "./modules/shared/sharedPages/blacklist/by-ip/by-ip.component";
import { ByMsisdnComponent } from "./modules/shared/sharedPages/blacklist/by-msisdn/by-msisdn.component";
import { SmsPlusComponent } from "./modules/sms-plus/sms-plus.component";
import { TelevotingComponent } from "./modules/televoting/televoting.component";
import { ReceivedMessageComponent } from "./modules/received-message/recieved-message/received-message.component";
import { ReceivedMessagesComponent } from "./modules/sms-plus/received-messages/received-messages.component";
import { CheckKeywordComponent } from "./modules/sms-plus/check-keyword/check-keyword.component";
import { BalanceDeductionComponent } from "./modules/sms-plus/balance-deduction/balance-deduction.component";
import { MessageSuccessComponent } from "./modules/sms-plus/message-success/message-success.component";
import { SentMessageComponent } from "./modules/sms-plus/sent-message/sent-message.component";
import { TSentMessageComponent } from "./modules/televoting/t-sent-message/t-sent-message.component";
import { TMessageSuccessComponent } from "./modules/televoting/t-message-success/t-message-success.component";
import { TBalanceDeductionComponent } from "./modules/televoting/t-balance-deduction/t-balance-deduction.component";
import { TCheckKeywordComponent } from "./modules/televoting/t-check-keyword/t-check-keyword.component";
import { TReceivedMessagesComponent } from "./modules/televoting/t-received-messages/t-received-messages.component";
import { CustomMessageComponent } from "./modules/sms-plus/custom-message/custom-message.component";
import { RadioButtonComponent } from "./component/htmlComponents/radio-button/radio-button.component";
import { SmsPlusDashboardComponent } from "./modules/sms-plus/sms-plus-dashboard/sms-plus-dashboard.component";
import { LineChartComponent } from "./component/htmlComponents/line-chart/line-chart.component";
import { DatePipe } from "@angular/common";
import { MessageDetailsComponent } from "./modules/sms-plus/message-details/message-details.component";
import { CreateNewGroupModalComponent } from "./modules/shared/sharedPages/campaign-who/campaignWhoModals/create-new-group-modal/create-new-group-modal.component";
import { ImportContactModalComponent } from "./modules/shared/sharedPages/campaign-who/campaignWhoModals/import-contact-modal/import-contact-modal.component";
import { CalenderComponent } from "./component/htmlComponents/calender/calender.component";
import { SpreadsheetDetailsComponent } from "./modules/shared/sharedPages/contact-lists/Import/spreadsheet-details/spreadsheet-details.component";
import { SearchComponent } from "./modules/shared/sharedPages/contact-lists/search/search.component";
import { DialogComponent } from "./component/htmlComponents/dialog/dialog.component";
import { AddClientComponent } from "./modules/admin/add-client/add-client.component";
import { ManageClientsComponent } from "./modules/admin/manage-clients/manage-clients.component";
import { EditClientsComponent } from "./modules/admin/edit-clients/edit-clients.component";
import { ServicesComponent } from "./modules/admin/services/services.component";
import { ServiceModalComponent } from "./modules/admin/services/service-modal/service-modal.component";
import { SuperAdminMenuComponent } from "./component/htmlComponents/super-admin-menu/super-admin-menu.component";
import { AddAdminComponent } from "./modules/super-admin/add-admin/add-admin.component";
import { ManageAdminComponent } from "./modules/super-admin/manage-admin/manage-admin.component";
import { EditAdminComponent } from "./modules/super-admin/edit-admin/edit-admin.component";
import { SmscComponent } from "./modules/super-admin/smsc/smsc.component";
import { SmscModalComponent } from "./modules/super-admin/smsc/smsc-modal/smsc-modal.component";
import { ShortCodeApprovalComponent } from "./modules/admin/short-code-approval/short-code-approval.component";
import { ShortCodeApprovalRequestComponent } from "./modules/super-admin/short-code-approval-request/short-code-approval-request.component";
import { ShortCodeRequestDetailsComponent } from "./modules/super-admin/short-code-request-details/short-code-request-details.component";
import { ShortCodeRequestStatusComponent } from "./modules/super-admin/short-code-request-status/short-code-request-status.component";
import { SingleSmsReportingComponent } from "./modules/shared/sharedPages/single-sms-reporting/single-sms-reporting.component";
import { BulkSmsReportingComponent } from "./modules/shared/sharedPages/bulk-sms-reporting/bulk-sms-reporting.component";
import { CampaignReportingComponent } from "./modules/shared/sharedPages/campaign-reporting/campaign-reporting.component";
import { TelevotingDashboardComponent } from "./modules/televoting/televoting-dashboard/televoting-dashboard.component";
import { TelevotingErrorsComponent } from "./modules/televoting/televoting-errors/televoting-errors.component";
import { SmsPlusErrorsComponent } from "./modules/sms-plus/sms-plus-errors/sms-plus-errors.component";
import { TMessageDetailsComponent } from "./modules/televoting/t-message-details/t-message-details.component";
import { LogsComponent } from './modules/admin/logs/logs.component';
import { AddSmscComponent } from './modules/super-admin/add-smsc/add-smsc.component';
import { PaginatorComponent } from './component/htmlComponents/paginator/paginator.component';
registerLocaleData(en);
/**
 * This function sends the request to get token.
 * @returns
 */
export function tokenGetter() {
  return localStorage.getItem("access_token");
}
/**
 *
 */
// export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StaffNavigationComponent,
    SuperNavigationComponent,
    AdminNavigationComponent,
    ClientNavigationComponent,
    ButtonComponent,
    TextBoxComponent,
    CapitalizationPipe,
    SignUpComponent,
    LinkButtonComponent,
    VerifyEmailAccountComponent,
    ResetPasswordComponent,
    SidePanelComponent,
    AdminSlideMenuComponent,
    ClientTieredMenuComponent,
    ForgotPasswordComponent,
    MergeSendComponent,
    DashboardComponent,
    DropDownComponent,
    CampaignWhatComponent,
    TextAreaComponent,
    CampaignWhoComponent,
    MultiSelectComponent,
    SplitButtonComponent,
    CampaignWhenComponent,
    TestAndConfirmComponent,
    SelectButtonComponent,
    HeaderComponent,
    CreateCampaignComponent,
    CheckBoxComponent,
    TextIconButtonComponent,
    ContactListsComponent,
    AddPartnersComponent,
    AddServicesComponent,
    SingleSmsComponent,
    CreateNewContactListComponent,
    InputTableComponent,
    InputChipsSpecialComponent,
    BulkSmsComponent,
    UploadFileComponent,
    TableComponent,
    ByIpComponent,
    ByMsisdnComponent,
    SmsPlusComponent,
    TelevotingComponent,
    ReceivedMessageComponent,
    ReceivedMessagesComponent,
    CheckKeywordComponent,
    BalanceDeductionComponent,
    MessageSuccessComponent,
    SentMessageComponent,
    TSentMessageComponent,
    TMessageSuccessComponent,
    TBalanceDeductionComponent,
    TCheckKeywordComponent,
    TReceivedMessagesComponent,
    CustomMessageComponent,
    RadioButtonComponent,
    SmsPlusDashboardComponent,
    LineChartComponent,
    MessageDetailsComponent,
    CreateNewGroupModalComponent,
    ImportContactModalComponent,
    CalenderComponent,
    SpreadsheetDetailsComponent,
    SearchComponent,
    DialogComponent,
    AddClientComponent,
    ManageClientsComponent,
    EditClientsComponent,
    ServicesComponent,
    ServiceModalComponent,
    SuperAdminMenuComponent,
    AddAdminComponent,
    ManageAdminComponent,
    EditAdminComponent,
    SmscComponent,
    SmscModalComponent,
    ShortCodeApprovalComponent,
    ShortCodeApprovalRequestComponent,
    ShortCodeRequestDetailsComponent,
    ShortCodeRequestStatusComponent,
    SingleSmsReportingComponent,
    BulkSmsReportingComponent,
    CampaignReportingComponent,
    TelevotingDashboardComponent,
    TelevotingErrorsComponent,
    SmsPlusErrorsComponent,
    TMessageDetailsComponent,
    LogsComponent,
    AddSmscComponent,
    PaginatorComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    LayoutModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    SidenavModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ["localhost:8080"],
        blacklistedRoutes: ["localhost:8080/api/auth/signin"],
      },
    }),
    HttpClientModule,
    AppRoutingModule,
    IconsProviderModule,

    // NgbModule,
    NgxMaskModule.forRoot(),
    NgbModule,
  ],
  providers: [MessageService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
