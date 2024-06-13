import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-import-contact-modal",
  templateUrl: "./import-contact-modal.component.html",
  styleUrls: ["./import-contact-modal.component.css"],
})
export class ImportContactModalComponent implements OnInit {
  /**
   * flag whether to open modal or close it
   */
  @Input() importContact: boolean;
  /**
   * modal close output call
   */
  @Output() close = new EventEmitter();
  /**
   * constructor of our component
   */
  constructor() {}
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {}
  /**
   * function to close modal and send an output call
   */
  closeModal() {
    this.importContact = false;
    this.close.emit();
  }
}
