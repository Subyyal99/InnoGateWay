import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkSmsReportingComponent } from './bulk-sms-reporting.component';

describe('BulkSmsReportingComponent', () => {
  let component: BulkSmsReportingComponent;
  let fixture: ComponentFixture<BulkSmsReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkSmsReportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkSmsReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
