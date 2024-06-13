import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelevotingDashboardComponent } from './televoting-dashboard.component';

describe('TelevotingDashboardComponent', () => {
  let component: TelevotingDashboardComponent;
  let fixture: ComponentFixture<TelevotingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelevotingDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelevotingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
