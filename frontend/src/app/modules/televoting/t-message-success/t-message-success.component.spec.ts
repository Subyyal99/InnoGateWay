import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TMessageSuccessComponent } from './t-message-success.component';

describe('TMessageSuccessComponent', () => {
  let component: TMessageSuccessComponent;
  let fixture: ComponentFixture<TMessageSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TMessageSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TMessageSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
