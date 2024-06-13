import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSmsComponent } from './single-sms.component';

describe('SingleSmsComponent', () => {
  let component: SingleSmsComponent;
  let fixture: ComponentFixture<SingleSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
