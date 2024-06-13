import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelevotingErrorsComponent } from './televoting-errors.component';

describe('TelevotingErrorsComponent', () => {
  let component: TelevotingErrorsComponent;
  let fixture: ComponentFixture<TelevotingErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelevotingErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelevotingErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
