import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelevotingComponent } from './televoting.component';

describe('TelevotingComponent', () => {
  let component: TelevotingComponent;
  let fixture: ComponentFixture<TelevotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelevotingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelevotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
