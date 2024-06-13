'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-a4cc8d1717e26751e943e4438f724c6f"' : 'data-target="#xs-components-links-module-AppModule-a4cc8d1717e26751e943e4438f724c6f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-a4cc8d1717e26751e943e4438f724c6f"' :
                                            'id="xs-components-links-module-AppModule-a4cc8d1717e26751e943e4438f724c6f"' }>
                                            <li class="link">
                                                <a href="components/AddAdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddClientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddClientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddPartnersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddPartnersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddServicesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddServicesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminNavigationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminNavigationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminSlideMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminSlideMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BalanceDeductionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BalanceDeductionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BulkSmsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BulkSmsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BulkSmsReportingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BulkSmsReportingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ByIpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ByIpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ByMsisdnComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ByMsisdnComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalenderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalenderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CampaignReportingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CampaignReportingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CampaignWhatComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CampaignWhatComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CampaignWhenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CampaignWhenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CampaignWhoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CampaignWhoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CheckBoxComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckBoxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CheckKeywordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckKeywordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClientNavigationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientNavigationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClientTieredMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientTieredMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactListsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContactListsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateCampaignComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateCampaignComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateNewContactListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateNewContactListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateNewGroupModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateNewGroupModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomMessageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomMessageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DropDownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DropDownComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditAdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditClientsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditClientsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForgotPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForgotPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImportContactModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImportContactModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InputChipsSpecialComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputChipsSpecialComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InputTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LineChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LineChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LinkButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LinkButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageAdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManageAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageClientsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManageClientsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MergeSendComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MergeSendComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MessageDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MessageSuccessComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageSuccessComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultiSelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultiSelectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RadioButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RadioButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReceivedMessageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReceivedMessageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReceivedMessagesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReceivedMessagesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResetPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SentMessageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SentMessageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ServiceModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ServicesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServicesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShortCodeApprovalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShortCodeApprovalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShortCodeApprovalRequestComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShortCodeApprovalRequestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShortCodeRequestDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShortCodeRequestDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShortCodeRequestStatusComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShortCodeRequestStatusComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidePanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidePanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignUpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignUpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SingleSmsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SingleSmsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SingleSmsReportingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SingleSmsReportingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SmsPlusComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmsPlusComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SmsPlusDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmsPlusDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SmsPlusErrorsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmsPlusErrorsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SmscComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmscComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SmscModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmscModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SplitButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SplitButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpreadsheetDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpreadsheetDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StaffNavigationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StaffNavigationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SuperAdminMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SuperAdminMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SuperNavigationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SuperNavigationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TBalanceDeductionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TBalanceDeductionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TCheckKeywordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TCheckKeywordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TMessageDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TMessageDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TMessageSuccessComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TMessageSuccessComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TReceivedMessagesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TReceivedMessagesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TSentMessageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TSentMessageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TelevotingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TelevotingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TelevotingDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TelevotingDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TelevotingErrorsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TelevotingErrorsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TestAndConfirmComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TestAndConfirmComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextAreaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextAreaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextBoxComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextBoxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextIconButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextIconButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadFileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadFileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VerifyEmailAccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VerifyEmailAccountComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-a4cc8d1717e26751e943e4438f724c6f"' : 'data-target="#xs-pipes-links-module-AppModule-a4cc8d1717e26751e943e4438f724c6f"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-a4cc8d1717e26751e943e4438f724c6f"' :
                                            'id="xs-pipes-links-module-AppModule-a4cc8d1717e26751e943e4438f724c6f"' }>
                                            <li class="link">
                                                <a href="pipes/CapitalizationPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CapitalizationPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CustomMaterialModule.html" data-type="entity-link" >CustomMaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/IconsProviderModule.html" data-type="entity-link" >IconsProviderModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddDatasetInfo.html" data-type="entity-link" >AddDatasetInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/addPartnersInfo.html" data-type="entity-link" >addPartnersInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/addServicesInfo.html" data-type="entity-link" >addServicesInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/BlackListInfo.html" data-type="entity-link" >BlackListInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/CampaignWhatInfo.html" data-type="entity-link" >CampaignWhatInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/CampaignWhenInfo.html" data-type="entity-link" >CampaignWhenInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/CampaignWhoInfo.html" data-type="entity-link" >CampaignWhoInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientInfo.html" data-type="entity-link" >ClientInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContactListInfo.html" data-type="entity-link" >ContactListInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContactListsInfo.html" data-type="entity-link" >ContactListsInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomValidatorsInfo.html" data-type="entity-link" >CustomValidatorsInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/FieldInfo.html" data-type="entity-link" >FieldInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/InputInfo.html" data-type="entity-link" >InputInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtResponse.html" data-type="entity-link" >JwtResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/LineChartInfo.html" data-type="entity-link" >LineChartInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginInfo.html" data-type="entity-link" >LoginInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/MergeSendInfo.html" data-type="entity-link" >MergeSendInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/OptionInfo.html" data-type="entity-link" >OptionInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShortCodeApprovalInfo.html" data-type="entity-link" >ShortCodeApprovalInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/SidePanelInfo.html" data-type="entity-link" >SidePanelInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/SmsDashboardInfo.html" data-type="entity-link" >SmsDashboardInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/SmsPlusDashboardInfo.html" data-type="entity-link" >SmsPlusDashboardInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/TableInfo.html" data-type="entity-link" >TableInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/TestAndConfirm.html" data-type="entity-link" >TestAndConfirm</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadFileInfo.html" data-type="entity-link" >UploadFileInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidatorsInfo.html" data-type="entity-link" >ValidatorsInfo</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthErrorHandlerService.html" data-type="entity-link" >AuthErrorHandlerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CampaignService.html" data-type="entity-link" >CampaignService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenStorageService.html" data-type="entity-link" >TokenStorageService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ClientGuard.html" data-type="entity-link" >ClientGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/NotLoggedInGuard.html" data-type="entity-link" >NotLoggedInGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/SuperAdminGuard.html" data-type="entity-link" >SuperAdminGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/data.html" data-type="entity-link" >data</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});