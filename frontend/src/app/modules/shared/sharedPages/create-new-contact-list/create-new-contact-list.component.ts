import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { AddDatasetInfo } from "src/app/component/componentModel/add-dataset-info";
import { FieldInfo } from "src/app/component/componentModel/field-info";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { ContactListsInfo } from "src/app/models/contactLists-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-create-new-contact-list",
  templateUrl: "./create-new-contact-list.component.html",
  styleUrls: ["./create-new-contact-list.component.css"],
})
export class CreateNewContactListComponent implements OnInit {
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  inputInfo: InputInfo[] = [];
  /**
   * this flag is used to check whether the value of input field changed
   */
  changeFlag = false;
  /**
   * this flag is used to check whether the value of TABLE input field changed
   */
  changeTableFlag = false;
  /**
   * header for the input table
   */
  inputTableHeaders: any;
  /**
   * this flag is used to check whether the value of input field changed
   */
  textAreaFlag = false;
  /**
   * number type variable for counting inputs
   */
  counterInputs = 0;
  /**
   * info to display for input table it is 2D array
   */
  inputTableInfo: InputInfo[][] = [];
  /**
   * to save our pages info a variable of type AddDatasetInfo
   */
  public datasetInfo = new AddDatasetInfo();
  /**
   * an output variable call out when modal is closed
   */
  @Output() closeModal = new EventEmitter();
  /**
   *to save our pages info a variable of type ContactListsInfo
   */
  contactListInfo = new ContactListsInfo();
  /**
   * dropdown options
   */
  dropDownData = [
    { name: "Use shared numbers" },
    {
      name: "A custom word",
    },
    { name: "Purchase a new virtual number" },
  ];
  /**
   * table options of multiple types
   */
  items = [
    {
      label: "Text",
      command: () => {
        this.generateTableData("text");
      },
    },
    {
      label: "Number",
      command: () => {
        this.generateTableData("number");
      },
    },
    // {
    //   label: "Radio Buttons",
    //   command: () => {
    //     this.generateTableData("Radio Buttons");
    //   },
    // },
    // {
    //   label: "Drop Down",
    //   command: () => {
    //     this.generateTableData("Drop Down");
    //   },
    // },
  ];
  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param Jarwis This connects Backend with Frontend
   * @param messageService is a message type variable created to display messages in our component
   */
  constructor(
    private messageService: MessageService,
    private Jarwis: AuthService
  ) {}
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    this.generateInputFields();
    this.inputTableHeaders = [
      { field: "name", header: "Name     ", type: "text", edit: "false" },
      {
        field: "columnName",
        header: "Column_Name",
        type: "text",
        edit: "false",
      },
      { field: "type", header: "Type", type: "text", edit: "false" },
      {
        field: "required",
        header: "Required?",
        type: "checkBox",
        edit: "false",
      },
      {
        field: "displayInContactList",
        header: "Display in contact list?",
        type: "checkBox",
        edit: "false",
      },
      { field: "d", header: "Actions", type: "checkBox", edit: "true" },
    ];
  }
  /**
   * this function generated our input fields and their corresponding data
   */
  generateInputFields() {
    this.createInput(
      "name",
      "Contact List Name",
      "name",
      "string",
      "text2",
      "A keyword for use with Email to SMS",
      [],
      "",
      [
        {
          type: Validators.required,
          msg: "You must enter name",
        },
      ]
    );
    // this.createInput(
    //   "phoneNumber",
    //   "Enter phone number ",
    //   "phoneNumber",
    //   "number",
    //   "text2",
    //   "",
    //   [],
    //   "",
    //   [
    //     {
    //       type: Validators.required,
    //       msg: "You must enter number",
    //     },
    //   ]
    // );
    // this.createInput(
    //   "defaultFromAddress",
    //   "Select address",
    //   "defaultFromAddress",
    //   "text",
    //   "dropDown",
    //   "",
    //   this.dropDownData,
    //   { name: this.dropDownData[0].name },
    //   [
    //     {
    //       type: Validators.required,
    //       msg: "You must select one option",
    //     },
    //   ]
    // );
    // this.createInput(
    //   "defaultFromAddress",
    //   "Contact List Name",
    //   "defaultFromAddress",
    //   "text",
    //   "checkBox",
    //   "Make this a Global Contact List",
    //   this.dropDownData,
    //   "",
    //   []
    // );
    // this.createInput(
    //   "",
    //   "",
    //   "globalContactList",
    //   "",
    //   "checkBox",
    //   "By signing up, you agree to our ",
    //   [],
    //   ["true"],
    //   []
    // );
    // this.createInput(
    //   "",
    //   "",
    //   "",
    //   "",
    //   "checkBox",
    //   "By signing up, you agree to our ",
    //   "",
    //   ["true"],
    //   [
    //     {
    //       type: Validators.required,
    //       msg: "You must agree to our communications and usage terms",
    //     },
    //   ]
    // );
    // this.createInput(
    //   "addExpiryToMessage",
    //   "",
    //   "",
    //   "",
    //   "checkBox",
    //   "Add expiry to this message ",
    //   "",
    //   ["true"],
    //   []
    // );
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
   * @param detail data to show around input fields
   * @param val default valu of any input field
   * @param check optional check
   */
  createInput(
    label,
    placeHolder,
    modelName,
    inputType,
    type,
    detail,
    data,
    val,
    validatorsInfo,
    check?
  ) {
    let obj = new InputInfo();
    obj.label = label;
    obj.placeHolder = placeHolder;
    obj.modelName = modelName;
    obj.inputType = inputType;
    obj.type = type;
    obj.details = detail;
    obj.data = data;
    obj.val = val;
    obj.validatorsInfo = validatorsInfo;
    this.inputInfo.push(obj);
  }
  /**
   * This function updates the data on the login page if any change is made
   *
   * @param value This is the new value provided by the user
   * @param modelName the name of the variable to store the data in
   */
  updateData(value, modelName) {
    this.contactListInfo[modelName] = value;
    if (value == "A custom word" && modelName == "defaultFromAddress") {
      // this.createInput(
      //   "yourWord",
      //   "Email Keyword",
      //   "yourWord",
      //   "string",
      //   "text2",
      //   "",
      //   [],
      //   "",
      //   []
      // );
    }
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
    if (!this.contactListInfo.name) {
      return;
    }
    let tableErorFlag = this.inputTableInfo.find((row) =>
      row.find((item) => item.errorFlag == true)
    );
    if (tableErorFlag) {
      return;
    }
    this.messageService.clear();
    this.addMessages("info", "Info", "Please Wait...");
    this.contactListInfo.customFields = this.datasetInfo.fields;
    this.Jarwis.addNewContactGroup(this.contactListInfo).subscribe(
      (data) => this.handleData1(data),
      (error) => this.handleError(error)
    );
  }
  /**
   * this function generated our input fields and their corresponding data
   * @param type optional variable determining the type of the input
   */
  generateTableData(type?) {
    let obj1 = this.createTableInput(
      "name",
      "Enter name",
      "text",
      "text2",
      type,
      [],
      [
        {
          type: Validators.required,
          msg: "You must enter name",
        },
      ]
    );
    let obj2 = this.createTableInput(
      "columnName",
      "Column Name must me same as in excel File",
      "text",
      "text2",
      type,
      [],
      [
        {
          type: Validators.required,
          msg: "You must enter column name",
        },
        // {
        //   type: Validators.pattern(`/^\w+_\w+$/`),
        //   msg: "Column name should be in the format 'text_text'",
        // },
      ]
    );

    let obj3 = this.createTableInput(
      "typeOfField",
      "",
      "text",
      "fieldType",
      type,
      [],
      [
        {
          type: Validators.required,
          msg: "You must enter description",
        },
      ]
    );
    let obj4 = this.createTableInput(
      "required",
      "",
      "checkBox",
      "checkBox",
      type,
      ["true"],
      []
    );

    let obj5 = this.createTableInput(
      "displayInContactList",
      "",
      "checkBox",
      "checkBox",
      type,
      ["true"],
      []
    );
    // let obj5 = this.createTableInput(
    //   "nameTextArea",
    //   "text",
    //   "text",
    //   "",
    //   "Write a description",
    //   []
    // );
    let field = new FieldInfo();
    field.name = "";
    field.description = "";
    field.type = type;
    field.matter = false;
    this.datasetInfo.fields.push(field);
    this.inputTableInfo.push([obj1, obj2, obj3, obj4, obj5]);
    // if (
    //   this.inputTableInfo[0][0].contactListType == "Radio Buttons" ||
    //   this.inputTableInfo[0][0].contactListType == "Drop Down"
    // ) {
    //   this.textAreaFlag = true;
    // }
  }
  /**
   * This functions takes multiple parameters and save them in an object of inputInfo
   *
   * @param modelName it contains name of the model variable for the data to be stored in
   * @param inputType This tells us the context of the content i.e email, password etc
   * @param type This tells us the type of input i.e text, number, symbols etc
   * @param validatorsInfo This is an object of a model which contains validators type and message
   * @param contactListType the type of the contact list
   * @param val default valu of any input field
   */
  createTableInput(
    modelName,
    placeHolder,
    inputType,
    type,
    contactListType,
    val,
    validatorsInfo
  ) {
    let inputObj = new InputInfo();
    inputObj.modelName = modelName;
    inputObj.placeHolder = placeHolder;
    inputObj.inputType = inputType;
    inputObj.type = type;
    inputObj.contactListType = contactListType;
    inputObj.validatorsInfo = validatorsInfo;
    inputObj.value = val;
    return inputObj;
  }
  /**
   *
   * @param values updated value from the table inputs
   */
  updateTable(values) {
    if (values.label == "matter") {
      this.datasetInfo.fields[values.index][values.label] =
        values.value.length > 0 ? true : false;
    } else if (
      values.label == "required" ||
      values.label == "displayInContactList"
    ) {
      this.datasetInfo.fields[values.index][values.label] = values.value[0];
    } else {
      this.datasetInfo.fields[values.index][values.label] = values.value;
    }
  }
  /**
   * this function is called when data from table is submitted
   * @returns
   */
  onTableSubmit() {
    this.changeFlag = !this.changeFlag;
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param data is the variable that gets the value from the function call send by the function call
   */
  handleData1(data) {
    this.messageService.clear();
    this.addMessages("success", "Success", "Group added successfully");
    this.closeModal.emit();
    this.inputInfo = [];
    this.inputTableInfo = [];
    this.generateInputFields();
  }
  /**
   * handle error is our function to handle error given by APi or custom made
   * @param error is the variable through which we recieve the error to display to the user
   */
  handleError(error) {
    let errMsg = error.error.message ? error.error.message : error.message;
    this.messageService.clear();
    this.addMessages("error", "Error", errMsg);
  }
  /**
   * This is the function that recieves the data retrieved by the API call
   * @param event is the variable that gets the value from the function call send by the function call
   */
  data(event) {}
  /**
   * this is our function to call the message service to display our required message
   * @param severity defines the type/severity of the message to be displayed
   * @param summary defines the summary of the message
   * @param detail contains the string of the message to be displayed
   */
  addMessages(severity, summary, detail) {
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
