import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSmsReportingComponent } from './single-sms-reporting.component';

describe('SingleSmsReportingComponent', () => {
  let component: SingleSmsReportingComponent;
  let fixture: ComponentFixture<SingleSmsReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSmsReportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSmsReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
