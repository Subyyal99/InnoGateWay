import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.css"],
})
export class PaginatorComponent implements OnInit {
  @Input() limit: number;
  @Input() totalRecords: number;
  @Output() paginatorValuesChange = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}
  onPageChange(event: any) {
    this.paginatorValuesChange.emit(event);
  }
}
