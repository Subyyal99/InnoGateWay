import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByMsisdnComponent } from './by-msisdn.component';

describe('ByMsisdnComponent', () => {
  let component: ByMsisdnComponent;
  let fixture: ComponentFixture<ByMsisdnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByMsisdnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByMsisdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
