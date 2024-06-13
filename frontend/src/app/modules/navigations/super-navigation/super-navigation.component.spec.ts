import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperNavigationComponent } from './super-navigation.component';

describe('SuperNavigationComponent', () => {
  let component: SuperNavigationComponent;
  let fixture: ComponentFixture<SuperNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
