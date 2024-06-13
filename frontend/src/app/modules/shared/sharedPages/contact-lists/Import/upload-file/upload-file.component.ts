import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { UploadFileInfo } from "src/app/component/componentModel/uploadFile-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.css"],
})
export class UploadFileComponent implements OnInit {
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  inputInfo: InputInfo[] = [];
  /**
   * flag to check whether the file uploaded is excel file
   */
  contactListExcelFlag = false;
  /**
   * data of the upload file is stored in this array
   */
  uploadedFiles = [];
  /**
   * this flag is used to check whether the value of input field changed
   */
  changeFlag = false;
  /**
   * number type variable for counting inputs
   */
  counterInputs = 0;
  /**
   * name of the file to be uploaded
   */
  fileName: string;
  /**
   * array to store contact groups
   */
  data = [];
  /**
   * upload file data is stored and send via this variable
   */
  uploadFileInfo = new UploadFileInfo();
  /**
   * an output call to close modal
   */
  @Output() closeModal = new EventEmitter();
  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param Jarwis This connects Backend with Frontend
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param messageService is a message type variable created to display messages in our component
   * @param tokenStorage is used to access tokenstorageservice
   */
  constructor(
    private router: Router,
    private messageService: MessageService,
    private Jarwis: AuthService,
    private tokenStorage: TokenStorageService
  ) {}
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    this.getGroupNames();
  }
  /**
   * this function generated our input fields and their corresponding data
   */
  generateFields() {
    this.createInput(
      "contactGroup",
      "Please select from here",
      "from",
      "string",
      "dropDown",
      "",
      "",
      this.data,
      [
        {
          type: Validators.required,
          msg: "You must select number",
        },
      ]
    );
  }
  /**
   * This functions takes multiple parameters and save them in an object of inputInfo
   *
   * @param label This is the name of the text boxes
   * @param modelName it contains name of the model variable for the data to be stored in
   * @param inputType This tells us the context of the content i.e email, password etc
   * @param type This tells us the type of input i.e text, number, symbols etc
   * @param placeHolder place holder to display in our input
   * @param data data required to display by our input
   * @param validatorsInfo This is an object of a model which contains validators type and message
   * @param details data to show around input fields
   * @param val default valu of any input field
   */
  createInput(
    label,
    placeHolder,
    modelName,
    inputType,
    type,
    details,
    val,
    data,
    validatorsInfo
  ) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.modelName = modelName;
    inputObj.inputType = inputType;
    inputObj.type = type;
    inputObj.data = data;
    inputObj.placeHolder = placeHolder;
    inputObj.validatorsInfo = validatorsInfo;
    this.inputInfo.push(inputObj);
  }
  /**
   * API call to get contact group name
   */
  getGroupNames() {
    this.Jarwis.getGroupNames().subscribe(
      (data) => this.handleGroupNamesData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleGroupNamesData(data) {
    this.data = data.contactGroups;
    this.data.map((contactList) => {
      contactList.name =
        contactList.name +
        " ( " +
        Math.floor(contactList.contactCount / contactList.customFieldsCount) +
        " Contacts )";
    });
    this.generateFields();
  }
  /**
   * This function updates the data on the login page if any change is made
   *
   * @param value This is the new value provided by the user
   * @param label This is the variable that passes along the value
   */
  updateData(value, label) {
    this.uploadFileInfo[label] = value;
  }
  /**
   * this function is call when we upload a file it checks its type and size and then saves in our desired array
   * @param event credentials of the file to be uploaded
   * @param form form that uploads the file
   * @param cond a string depicting the type of content of the file
   * @returns
   */
  uploader(event, form, cond) {
    this.fileName = event.files[0].name;
    if (
      event.files[0].type.includes(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      this.contactListExcelFlag = true;
    } else if (
      event.files[0].type !=
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      this.addMessages("error", "Error", "You can only upload excel files");
      form.clear();
      return;
    }
    if (event.files[0].size > 1000000) {
      this.addMessages("error", "Error", "File size must be less than 1MB");
      form.clear();
      return;
    }
    // if(this.cvPdfFlag||this.cvOtherFilesFlag){
    this.uploadedFiles["contacts"] = [];
    this.uploadedFiles["contacts"].push(event.files[0]);
    this.uploadedFiles["contacts"].push(URL.createObjectURL(event.files[0]));
    // this.certificateInfo.cvImageShow = URL.createObjectURL(event.files[0])

    // this.previousCvFilesFlag = false;
  }
  /**
   * handle error is our function to handle error given by APi or custom made
   * @param error is the variable through which we recieve the error to display to the user
   */
  handleError(error) {
    this.messageService.clear();
    let msg = error.error ? error.error.message : error.message;

    this.addMessages("error", "Error", msg);
  }
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
  /**
   *
   * @param form to remove file before uploading
   */
  remove(form) {
    this.fileName = "";
    form.clear();
  }
  /**
   * this function is called by or input when user submit it then check whether or not is there an error
   */
  preSubmit() {
    this.counterInputs = 0;
    this.changeFlag = !this.changeFlag;
  }
  /**
   * our function that get called when user send the final data
   * @returns an Observable instance that synchronously delivers the values provided as arguments.
   */
  onSubmit() {
    this.counterInputs++;
    if (this.counterInputs < this.inputInfo.length) {
      return;
    }
    let errorFlag = this.inputInfo.find((item) => item.errorFlag == true);
    if (errorFlag) {
      return;
    }
    // if (!this.mergeSend.messageType) {
    //   this.addMessages("error", "Error", "Please select message type");
    //   return;
    // }
    // if (this.mergeSend.messageType == "mms") {
    //   this.addMessages("error", "Error", "MMS currently not available");
    //   return;
    // }
    // if (!this.mergeSend.from) {
    //   this.addMessages("error", "Error", "Please select sender ...");
    //   return;
    // }
    this.messageService.clear();
    var formData: FormData = new FormData();
    if (this.contactListExcelFlag) {
      formData.append("contacts", this.uploadedFiles["contacts"][0]);
    }
    formData.append(
      "contactGroupInfo",
      JSON.stringify(this.uploadFileInfo.contactGroup)
    );
    // this.uploadFileInfo.contactsFile = this.uploadedFiles["contacts"];
    this.addMessages("info", "Info", "Please wait...");
    this.Jarwis.readFileName(formData).subscribe(
      (data) => this.handleData(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleData(data) {
    this.messageService.clear();
    this.closeModal.emit();
    let file = data.file;
    this.tokenStorage.saveFile(file);
    this.router.navigate(["side-panel/spreadsheet-preview"], {
      queryParams: { id: data.contactGroupId },
    });
  }
}
