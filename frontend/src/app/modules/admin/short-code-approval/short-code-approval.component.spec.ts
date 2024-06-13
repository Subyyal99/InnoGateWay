import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortCodeApprovalComponent } from './short-code-approval.component';

describe('ShortCodeApprovalComponent', () => {
  let component: ShortCodeApprovalComponent;
  let fixture: ComponentFixture<ShortCodeApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortCodeApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortCodeApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
