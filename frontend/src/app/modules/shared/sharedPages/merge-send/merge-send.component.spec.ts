import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeSendComponent } from './merge-send.component';

describe('MergeSendComponent', () => {
  let component: MergeSendComponent;
  let fixture: ComponentFixture<MergeSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
