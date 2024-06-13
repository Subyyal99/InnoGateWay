import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortCodeRequestDetailsComponent } from './short-code-request-details.component';

describe('ShortCodeRequestDetailsComponent', () => {
  let component: ShortCodeRequestDetailsComponent;
  let fixture: ComponentFixture<ShortCodeRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortCodeRequestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortCodeRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
