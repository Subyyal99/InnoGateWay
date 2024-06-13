import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TReceivedMessagesComponent } from './t-received-messages.component';

describe('TReceivedMessagesComponent', () => {
  let component: TReceivedMessagesComponent;
  let fixture: ComponentFixture<TReceivedMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TReceivedMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TReceivedMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
