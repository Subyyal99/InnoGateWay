import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSlideMenuComponent } from './admin-slide-menu.component';

describe('AdminSlideMenuComponent', () => {
  let component: AdminSlideMenuComponent;
  let fixture: ComponentFixture<AdminSlideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSlideMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSlideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
