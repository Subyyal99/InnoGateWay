import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartnersComponent } from './add-partners.component';

describe('AddPartnersComponent', () => {
  let component: AddPartnersComponent;
  let fixture: ComponentFixture<AddPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
