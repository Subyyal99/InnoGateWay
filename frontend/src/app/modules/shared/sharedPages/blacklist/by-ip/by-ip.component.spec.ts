import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByIpComponent } from './by-ip.component';

describe('ByIpComponent', () => {
  let component: ByIpComponent;
  let fixture: ComponentFixture<ByIpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByIpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
