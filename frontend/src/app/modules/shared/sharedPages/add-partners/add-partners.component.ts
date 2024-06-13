import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { addPartnersInfo } from "src/app/models/addPartners-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-add-partners",
  templateUrl: "./add-partners.component.html",
  styleUrls: ["./add-partners.component.css"],
})
export class AddPartnersComponent implements OnInit {
  /**
   * an inputInfo type array in which we store data for our inputs
   */
  inputInfo: InputInfo[] = [];
  /**
   * this flag is used to check whether the value of input field changed
   */
  changeFlag = false;
  /**
   * step number that is currently going on
   */
  step: number = 1;
  /**
   * page data is stored in this variable
   */
  public AddPartnerInfo = new addPartnersInfo();
  /**
   * This is a default method of the class that is executed when the class is
   * instantiated and ensures proper initialisation of fields in the class and its subclasses.
   * @param router is a router type variable created to use router functions to navigate within our project
   *
   */
  constructor(private router: Router) {}
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    this.generateFormData();
  }
  /**
   * this function generated our input fields and their corresponding data
   */
  generateFormData() {
    this.createInput("Partner Name", "strng", "text2", "", "Enter Name Here", [
      {
        type: Validators.required,
        msg: "You must give your Campaign name",
      },
    ]);
    this.createInput(
      "Description",
      "Strng",
      "text",
      "",
      "Write a description",
      []
    );
    this.createInput("Short code", "strng", "multiSelect2", "", "Select", []);
  }
  /**
   * This functions takes multiple parameters and save them in an object of inputInfo
   *
   * @param label This is the name of the text boxes
   * @param details data to show around input fields
   * @param inputType This tells us the context of the content i.e email, password etc
   * @param type This tells us the type of input i.e text, number, symbols etc
   * @param placeHolder place holder to display in our input
   * @param validatorsInfo This is an object of a model which contains validators type and message
   */
  createInput(label, inputType, type, details, placeHolder, validatorsInfo) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.inputType = inputType;
    inputObj.type = type;
    inputObj.details = details;
    inputObj.placeHolder = placeHolder;
    inputObj.validatorsInfo = validatorsInfo;
    this.inputInfo.push(inputObj);
  }
  /**
   * This function updates the data on the login page if any change is made
   *
   * @param value This is the new value provided by the user
   * @param label This is the variable that passes along the value
   */
  updateData(value, label) {
    this.AddPartnerInfo[label] = value;
  }
  /**
   *
   * @param val the number of the step
   */
  onClick(val) {
    this.step = 0;
    this.step = val;
  }
}
