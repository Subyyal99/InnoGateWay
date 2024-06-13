import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TMessageDetailsComponent } from './t-message-details.component';

describe('TMessageDetailsComponent', () => {
  let component: TMessageDetailsComponent;
  let fixture: ComponentFixture<TMessageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TMessageDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TMessageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
