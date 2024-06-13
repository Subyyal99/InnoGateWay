import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsPlusErrorsComponent } from './sms-plus-errors.component';

describe('SmsPlusErrorsComponent', () => {
  let component: SmsPlusErrorsComponent;
  let fixture: ComponentFixture<SmsPlusErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsPlusErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsPlusErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
