import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadsheetDetailsComponent } from './spreadsheet-details.component';

describe('SpreadsheetDetailsComponent', () => {
  let component: SpreadsheetDetailsComponent;
  let fixture: ComponentFixture<SpreadsheetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpreadsheetDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadsheetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
