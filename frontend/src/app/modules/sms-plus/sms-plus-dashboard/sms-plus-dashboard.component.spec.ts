import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsPlusDashboardComponent } from './sms-plus-dashboard.component';

describe('SmsPlusDashboardComponent', () => {
  let component: SmsPlusDashboardComponent;
  let fixture: ComponentFixture<SmsPlusDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsPlusDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsPlusDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
