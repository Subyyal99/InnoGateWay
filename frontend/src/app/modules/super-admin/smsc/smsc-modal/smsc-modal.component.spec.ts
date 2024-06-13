import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmscModalComponent } from './smsc-modal.component';

describe('SmscModalComponent', () => {
  let component: SmscModalComponent;
  let fixture: ComponentFixture<SmscModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmscModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmscModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
