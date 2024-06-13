import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckKeywordComponent } from './check-keyword.component';

describe('CheckKeywordComponent', () => {
  let component: CheckKeywordComponent;
  let fixture: ComponentFixture<CheckKeywordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckKeywordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
