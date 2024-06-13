import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewContactListComponent } from './create-new-contact-list.component';

describe('CreateNewContactListComponent', () => {
  let component: CreateNewContactListComponent;
  let fixture: ComponentFixture<CreateNewContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewContactListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
