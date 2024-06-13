import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortCodeApprovalRequestComponent } from './short-code-approval-request.component';

describe('ShortCodeApprovalRequestComponent', () => {
  let component: ShortCodeApprovalRequestComponent;
  let fixture: ComponentFixture<ShortCodeApprovalRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortCodeApprovalRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortCodeApprovalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
