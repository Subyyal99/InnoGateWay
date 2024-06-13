import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortCodeRequestStatusComponent } from './short-code-request-status.component';

describe('ShortCodeRequestStatusComponent', () => {
  let component: ShortCodeRequestStatusComponent;
  let fixture: ComponentFixture<ShortCodeRequestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortCodeRequestStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortCodeRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
