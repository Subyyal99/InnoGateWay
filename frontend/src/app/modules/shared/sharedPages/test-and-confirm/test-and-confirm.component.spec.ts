import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAndConfirmComponent } from './test-and-confirm.component';

describe('TestAndConfirmComponent', () => {
  let component: TestAndConfirmComponent;
  let fixture: ComponentFixture<TestAndConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAndConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAndConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
