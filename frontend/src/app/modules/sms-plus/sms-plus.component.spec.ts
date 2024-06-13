import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsPlusComponent } from './sms-plus.component';

describe('SmsPlusComponent', () => {
  let component: SmsPlusComponent;
  let fixture: ComponentFixture<SmsPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsPlusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
