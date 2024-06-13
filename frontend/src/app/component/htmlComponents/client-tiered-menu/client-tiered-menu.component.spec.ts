import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTieredMenuComponent } from './client-tiered-menu.component';

describe('ClientTieredMenuComponent', () => {
  let component: ClientTieredMenuComponent;
  let fixture: ComponentFixture<ClientTieredMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientTieredMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientTieredMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
