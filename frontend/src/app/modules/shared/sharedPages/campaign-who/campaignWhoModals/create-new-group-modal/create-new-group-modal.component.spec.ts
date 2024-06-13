import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewGroupModalComponent } from './create-new-group-modal.component';

describe('CreateNewGroupModalComponent', () => {
  let component: CreateNewGroupModalComponent;
  let fixture: ComponentFixture<CreateNewGroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewGroupModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
