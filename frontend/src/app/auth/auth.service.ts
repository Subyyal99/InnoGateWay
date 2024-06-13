import { TokenStorageService } from "./token-storage.service";
import { LoginInfo } from "./../models/login-info";
// import { User } from './../models/user';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { JwtResponse } from "./jwt-response";
import { MergeSendInfo } from "../models/mergeSend-info";
import { ClientInfo } from "../models/client-info";
import { environment } from "src/environments/environment";
import { SmscInfo } from "../models/addSmsc-info";
/**
 * it is a variable of constant type that defines the api of request header and also get the meta data
 */
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Accept: "application/json",
    // "Access-Control-Allow-Origin": "https://sms.innovacontents.com/api/",
    "Access-Control-Allow-Origin": environment.url,
  }),
};
/**
 * It is a Decorator that marks a class as available to be provided and injected as a dependency.
 */
@Injectable({
  providedIn: "root",
})
export class AuthService {
  /**
   * It is a url of an api
   */
  private baseUrl = environment.url;

  /**
   * This is our constructor
   * @param http object of http client
   * @param tokenStorage parameter of token storage service
   */
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}
  /**
   * This function is used to login, it stores user login credentials
   * @param credentials this parameter stores and passes user credentials
   * @returns
   */
  public authenticate(credentials: LoginInfo): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/users/login`,
      credentials,
      httpOptionsSaved
    );
  }
  /**
   * This function is used to sign up user, it stores user sign up credentials
   * @param credentials this parameter stores and passes user credentials
   * @returns
   */
  public signUp(credentials: LoginInfo): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/users/register`,
      credentials,
      httpOptionsSaved
    );
  }
  /**
   * This API call is to get all client information
   * @returns
   */
  public getAllClients(): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<JwtResponse>(
      `${this.baseUrl}/users/get-all-clients`,
      httpOptionsSaved
    );
  }
  /**
   * This API call is to get all admin information
   * @returns
   */
  public getAllAdmins(): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<JwtResponse>(
      `${this.baseUrl}/users/get-all-admins`,
      httpOptionsSaved
    );
  }
  /**
   * This API call is to get specific client information by id
   * @param id id of the client
   * @returns
   */

  public getClient(id): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/users/get-client`,
      id,
      httpOptionsSaved
    );
  }
  /**
   * This API call is to get specific admin information by id
   * @param id id of the admin
   * @returns
   */

  public getAdmin(id): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/users/get-admin-by-id`,
      id
    );
  }
  /**
   * This API call is to get specific client information by id
   * @param id id of the client
   * @returns
   */

  public getClientInfo(id): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/users/get-client-info`,
      id
    );
  }
  /**
   * This API call is to update client information
   * @param data data of the client to update
   * @returns
   */

  public updateClient(data): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/users/update-client`,
      data,
      httpOptionsSaved
    );
  }
  /**
   * This API call is to delete client by id
   * @param id id of the client to delete
   * @returns
   */
  public deleteClient(id): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/users/delete-clients`,
      id,
      httpOptionsSaved
    );
  }
  /**
   * This function is used to verify email of user after sign up
   * @param info this parameter stores and passes email address to be verified
   * @returns
   */
  public verifyEmail(info: any): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/accounts/verify-email`,
      info,
      httpOptionsSaved
    );
  }
  /**
   * This function is used when forgot password function is called and is used to reset password
   * @param credentials this parameter stores and passes values
   * @returns
   */
  public forgotPassword(credentials: LoginInfo): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/accounts/forgot-password`,
      credentials,
      httpOptionsSaved
    );
  }
  /**
   * This function is used for for resetting password
   * @param credentials this parameter stores and passes values
   * @returns
   */
  public resetPassword(credentials: LoginInfo): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/accounts/reset-password`,
      credentials,
      httpOptionsSaved
    );
  }
  /**
   * THIS API is to send sms
   * @param info sms info
   * @returns
   */
  public sendMessage(info: MergeSendInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/sms/send`,
      info,
      httpOptionsSaved
    );
  }
  /**
   * This API call is to get single sms
   * @returns
   */
  public getSinleSms(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/sms/get-single-sms`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get sms count
   * @param info info to get count
   * @returns
   */
  public getSmscount(info): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/sms/count`,
      info,
      httpOptionsSaved
    );
  }
  /**
   * API call save message templates
   * @param info message template data
   * @returns
   */
  public saveTemplate(info): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/templates/save-template`,
      info,
      httpOptionsSaved
    );
  }
  /**
   * API call to get all templates
   * @returns
   */
  public getAllTemplate(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/templates/get-all-templates`,
      httpOptionsSaved
    );
  }
  /**
   * API call to send sms in bulk
   * @param info merge send info type variable contain sms data
   * @returns
   */
  public sendBulkMessage(info: MergeSendInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/sms/send-bulk`,
      info,
      httpOptionsSaved
    );
  }
  /**
   *API call to get bulk sms
   * @returns
   */
  public getBulkSms(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/sms/get-bulk-sms`,
      httpOptionsSaved
    );
  }
  /**
   * API call to send merge sms
   * @param info merge send info type variable contain sms data
   * @returns
   */
  public sendMergeMessage(info: MergeSendInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/sms/send-merge`,
      info,
      httpOptionsSaved
    );
  }
  /**
   * this API call reads excel file to be uploaded
   * @param info file information
   * @returns
   */
  public readFileName(info): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        // "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/contacts/readFileName`,
      info,
      httpOptionsSaved
    );
  }
  public getContactGroupFields(contactGroupId): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/contacts/get-contact-group-fields`,
      contactGroupId,
      httpOptionsSaved
    );
  }
  /**
   * API call to get file data
   * @param info info req to get file data
   * @returns
   */
  public getfileData(info): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        // "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/contacts/read-file-data`,
      info,
      httpOptionsSaved
    );
  }
  /**
   * API to import contact from file
   * @param info data to import file
   * @returns
   */
  public importContacts(info): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        // "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/contacts/import-list`,
      info,
      httpOptionsSaved
    );
  }
  public removeContactList(id): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/contacts/remove-contact-list`,
      id,
      httpOptionsSaved
    );
  }
  /**
   * API to delete specific contact
   * @param id id of the contact
   * @returns
   */
  public removeContact(id): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/contacts/remove-contact`,
      id,
      httpOptionsSaved
    );
  }
  /**
   * API call to add contact groups
   * @param info contact group information
   * @returns
   */
  public addNewContactGroup(info): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/contacts/add-new-group`,
      info,
      httpOptionsSaved
    );
  }
  /**
   * API call to get contact group names
   * @returns
   */
  public getGroupNames(data?): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/contacts/get-all-groups`,
      data,
      httpOptionsSaved
    );
  }
  /**
   * API call to search contact
   * @param info info required for searching contacts
   * @returns
   */
  public searchContacts(info): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/contacts/search`,
      info,
      httpOptionsSaved
    );
  }
  /**
   * getting contact group count by id
   * @param id id to get group count
   * @returns
   */
  public getGroupContactCount(id): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/contacts/get-group-contact-count`,
      id,
      httpOptionsSaved
    );
  }
  /**
   * API call to get contact list by id
   * @param id id to get contact list
   * @returns
   */
  public getGroupContactListById(id): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/contacts/get-group-contact-list`,
      id,
      httpOptionsSaved
    );
  }
  public getFieldsContacts(data): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/contacts/get-fields-contacts`,
      data,
      httpOptionsSaved
    );
  }
  /**
   * API call to black list ip address
   * @param info ip and reason to blacklist
   * @returns
   */
  public blackListIpAddress(info): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/blackList/by-ip`,
      info,
      httpOptionsSaved
    );
  }
  /**
   *
   * @returns API call to get blacklisted ips
   */
  public getBlackListedIps(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/blackList/get-blackListed-ips`,
      httpOptionsSaved
    );
  }
  /**
   * API call remove blacklisted ip
   * @param id id to remove ip
   * @returns
   */
  public removeBlackListedIp(id): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/blackList/remove-blackListed-ips`,
      id,
      httpOptionsSaved
    );
  }
  /**
   * API call to black list msisdn address
   * @param info msisdn and reason to blacklist
   * @returns
   */
  public blackListMsisdnAddress(info): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/blackList/by-msisdn`,
      info,
      httpOptionsSaved
    );
  }
  /**
   * API call to get blacklisted MSISDNs
   * @returns
   */
  public getBlackListedMsisdns(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/blackList/get-blackListed-msisdns`,
      httpOptionsSaved
    );
  }
  /**
   * API call to remove blacklisted MSISDN
   * @param id is of the MSISDN
   * @returns
   */
  public removeBlackListedMsisdn(id): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/blackList/remove-blackListed-msisdn`,
      id,
      httpOptionsSaved
    );
  }
  /**
   * API call to get sms plus messages
   * @returns
   */
  public getSmsPlusMessage(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/smsPlus/get-messages`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get other messages
   * @returns
   */
  public getOthersMessage(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/smsPlus/get-others-messages`,
      httpOptionsSaved
    );
  }
  /**
   * Api call to save custom message
   * @param info message info
   * @returns
   */
  public customMessage(info: MergeSendInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/smsPlus/save-custom-message`,
      info,
      httpOptionsSaved
    );
  }
  /**
   * Api call to get all custom messages
   * @returns custom messages
   */
  public getAllCustomMessage(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/smsPlus/get-all-custom-message`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get sms counts for dashboard
   * @returns sms-plus counts
   */
  public getAllCount(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/smsPlus/get-all-count`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get televoting counts for dashboard
   * @returns televoting counts
   */
  public getAllTelevotingCount(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/smsPlus/get-all-televoting-count`,
      httpOptionsSaved
    );
  }
  /**
   *  APi call to get sms-plus custom message
   * @param info required data
   * @returns
   */
  public getCustomMessage(info: MergeSendInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/smsPlus/get-custom-message`,
      info,
      httpOptionsSaved
    );
  }
  /**
   * API call to get check keyword messages
   * @returns check keyword messages
   */
  public getSmsPlusCheckKeywordMessage(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/smsPlus/get-check-keyword-messages`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get data for chart from data base
   * @param dbName database name
   * @returns
   */
  public getGraphData(dbName): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/smsPlus/get-chart-data`,
      dbName,
      httpOptionsSaved
    );
  }
  /**
   * API call to get Campaign graph data
   * @param dbName database name
   * @returns
   */
  public getCampaignGraphData(dbName): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/sms/get-campaign-chart-data`,
      dbName,
      httpOptionsSaved
    );
  }
  /**
   * API call to get televoting graph data
   * @param dbName database name
   * @returns
   */
  public getTelevotingGraphData(dbName): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/smsPlus/get-televoting-chart-data`,
      dbName,
      httpOptionsSaved
    );
  }
  /**
   * API call to get debit graph data
   * @param data data to get graph data
   * @returns
   */
  public getDebitGraphData(data): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/smsPlus/get-debit-chart-data`,
      data,
      httpOptionsSaved
    );
  }
  /**
   * API call to get televoting debit graph data
   * @param data important information
   * @returns
   */
  public getTelevotingDebitGraphData(data): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/smsPlus/get-televoting-debit-chart-data`,
      data,
      httpOptionsSaved
    );
  }
  /**
   * API call to get balance deduction messages
   * @returns
   */
  public getSmsPlusBalanceDeductionMessage(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/smsPlus/get-balance-deduction-messages`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get successfull deduction messages
   * @returns
   */
  public getSmsPlusSuccessfullMessage(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/smsPlus/get-successfull-messages`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get sent deduction messages
   * @returns
   */
  public getSmsPlusSentMessage(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/smsPlus/get-sent-messages`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get user message services
   * @returns
   */
  public getMessageServices(shortcode?): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/smsPlus/get-user-message-services`,
      shortcode,
      httpOptionsSaved
    );
  }
  /**
   * API call to get sms-plus error messages
   * @returns
   */
  public getSmsPlusErrorMessage(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/smsPlus/get-error-messages`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get televoting messages
   * @returns
   */
  public getTelevotingMessage(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/televoting/get-messages`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get televoting check keyword messages
   * @returns
   */
  public getTelevotingCheckKeywordMessage(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/televoting/get-check-keyword-messages`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get televoting balance deduction messages
   * @returns
   */
  public getTelevotingBalanceDeductionMessage(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/televoting/get-balance-deduction-messages`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get televoting successfull messages
   * @returns
   */
  public getTelevotingSuccessfullMessage(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/televoting/get-successfull-messages`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get televoting sent messages
   * @returns
   */
  public getTelevotingSentMessage(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/televoting/get-sent-messages`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get televoting error messages
   * @returns
   */
  public getTelevotingErrorMessage(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/televoting/get-error-messages`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get recieved messages
   * @returns
   */
  public getReceivedMessage(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/recMsgs/get-messages`,
      httpOptionsSaved
    );
  }
  /**
   * APi call to get info to display in header
   */
  public getHeaderInfo(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/users/get-header-info`,

      httpOptionsSaved
    );
  }
  /**
   * API call to get message details in sms plus
   * @param data message data
   * @returns
   */
  public getMessageDetails(data): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/smsPlus/get-message-detail`,
      data,
      httpOptionsSaved
    );
  }
  /**
   * API call to save campiagn
   * @param data campaign data
   * @returns
   */
  public saveCampaignData(data): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/sms/save-campaign`,
      data,
      httpOptionsSaved
    );
  }
  /**
   * Api call to get all campaigns
   * @returns
   */
  public getCampaigns(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/sms/get-campaigns`,
      httpOptionsSaved
    );
  }
  /**
   * API call to send campaign messages
   * @param id id of the campaign to send
   * @returns
   */
  public sendCampaignData(id): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/sms/send-campaign`,
      id,
      httpOptionsSaved
    );
  }
  /**
   * API call to get campaign messages
   * @param id id of the campaign to get
   * @returns
   */
  public getCampaign(id): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/sms/get-campaign`,
      id,
      httpOptionsSaved
    );
  }
  /**
   * API call to get campaign report
   * @param id id of the campaign to report
   * @returns
   */
  public getCampaignReport(id): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/sms/get-campaign-report`,
      id,
      httpOptionsSaved
    );
  }
  /**
   * API call to get all campaigns by id
   * @param id id of the campaign to send
   * @returns
   */
  public getAllCampaigns(id): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/sms/get-all-campaign`,
      id,
      httpOptionsSaved
    );
  }
  /**
   * APi call to get all message counts
   * @returns
   */
  public getMessageCounts(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/sms/get-all-message-count`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get short codes
   * @returns
   */
  public getShortCodes(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/shortCode/get-allowed-codes`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get short codes allowed to user
   * @param serviceId id of the service short codes were alloted to
   * @returns
   */
  public getUserShortCodes(serviceId): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/shortCode/get-user-short-code`,
      serviceId,
      httpOptionsSaved
    );
  }
  /**
   * API call to get all service
   * @returns
   */
  public getServices(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/service/get-all-services`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get services alloted to user/client
   * @param id id of the client
   * @returns
   */
  public getUserServices(id): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/service/get-user-services`,
      id,
      httpOptionsSaved
    );
  }
  /**
   * API call to delete user service
   * @param id id service to be deleted
   * @returns
   */
  public deleteUserServices(id): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/service/delete-user-service`,
      id,
      httpOptionsSaved
    );
  }
  /**
   * API call to add user service
   * @param data service data
   * @returns
   */
  public addUserServices(data: ClientInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/service/add-user-service`,
      data,
      httpOptionsSaved
    );
  }
  /**
   * API call to get specific service by name
   * @param name name of the service
   * @returns
   */
  public getService(name): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/service/get-service-by-name`,
      name,
      httpOptionsSaved
    );
  }
  /**
   * API call to check user services
   * @returns
   */
  public checkUserServices(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/service/check-user-service`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get message data by id
   * @param id id of the service
   * @returns
   */
  public getMessageData(id): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/service/get-message-data`,
      id,
      httpOptionsSaved
    );
  }
  /**
   * API call to update service data
   * @param data service data to update
   * @returns
   */
  public updateServiceData(data): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/service/update-service-data`,
      data,
      httpOptionsSaved
    );
  }
  /**
   * API call to get service id by name
   * @param name name of the service
   * @returns
   */
  public getServiceId(name): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/service/get-service-id`,
      name,
      httpOptionsSaved
    );
  }
  /**
   * API call to get all SMSCs
   * @returns
   */
  public getSmscs(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<string>(
      `${this.baseUrl}/smsc/get-all-smsc`,
      httpOptionsSaved
    );
  }
  /**
   * API call to assign SMSC to admin
   * @param data SMSC to assign
   * @returns
   */
  public addAdminSmscs(data): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/smsc/add-admin-smscs`,
      data,
      httpOptionsSaved
    );
  }
  /**
   * API call to get admin SMSC
   * @param id id of the admin
   * @returns
   */
  public getAdminSmsc(id): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/smsc/get-admin-smscs`,
      id,
      httpOptionsSaved
    );
  }
  /**
   * API call to update SMSC data
   * @param data SMSC to update
   * @returns
   */
  public updateSmscData(data): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<string>(
      `${this.baseUrl}/smsc/update-admin-smsc`,
      data,
      httpOptionsSaved
    );
  }
  /**
   * API call to request shortcode for approval
   * @param info necessary shortcode approval data
   * @returns
   */
  public sendShortCodeApprovalRequest(info): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/shortCode/send-short-code-approval-request`,
      info,
      httpOptionsSaved
    );
  }
  /**
   * API call to get short code approval requests
   * @returns
   */
  public getShortCodeApprovalRequests(): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<JwtResponse>(
      `${this.baseUrl}/shortCode/get-short-code-approval-requests`,
      httpOptionsSaved
    );
  }
  /**
   * API call to get short code approval requests by id
   * @param id id of the short code
   * @returns
   */
  public getShortCodeApprovalRequestById(id): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/shortCode/get-short-code-approval-request-by-id`,
      id,
      httpOptionsSaved
    );
  }
  /**
   * API call to get short code approval requests that are edited by super admin
   * @returns
   */
  public getShortCodeEditedRequests(): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<JwtResponse>(
      `${this.baseUrl}/shortCode/get-short-code-edited-requests`,
      httpOptionsSaved
    );
  }
  /**
   * API call to update shortcode approval requesst by super admin
   * @param info data to update
   * @returns
   */
  public updateShortCodeApprovalRequest(info): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/shortCode/update-short-code-approval-request`,
      info,
      httpOptionsSaved
    );
  }
  /**
   * API call to get logs
   * @returns
   */
  public getLogs(): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.get<JwtResponse>(
      `${this.baseUrl}/logs/get-all-logs`,
      httpOptionsSaved
    );
  }
  /**
   * This function is used add smscs by super admin
   * @param data smsc data to add
   * @returns
   */
  public addSmsc(data: SmscInfo): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "x-access-token": this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/smsc/add-smsc`,
      data,
      httpOptionsSaved
    );
  }
}
