import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TBalanceDeductionComponent } from './t-balance-deduction.component';

describe('TBalanceDeductionComponent', () => {
  let component: TBalanceDeductionComponent;
  let fixture: ComponentFixture<TBalanceDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TBalanceDeductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TBalanceDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
