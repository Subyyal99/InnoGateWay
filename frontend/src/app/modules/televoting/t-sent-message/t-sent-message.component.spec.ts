import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TSentMessageComponent } from './t-sent-message.component';

describe('TSentMessageComponent', () => {
  let component: TSentMessageComponent;
  let fixture: ComponentFixture<TSentMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TSentMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TSentMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
