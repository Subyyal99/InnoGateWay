import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminMenuComponent } from './super-admin-menu.component';

describe('SuperAdminMenuComponent', () => {
  let component: SuperAdminMenuComponent;
  let fixture: ComponentFixture<SuperAdminMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdminMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
