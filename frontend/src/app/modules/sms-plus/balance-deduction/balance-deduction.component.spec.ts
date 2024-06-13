import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceDeductionComponent } from './balance-deduction.component';

describe('BalanceDeductionComponent', () => {
  let component: BalanceDeductionComponent;
  let fixture: ComponentFixture<BalanceDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceDeductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
