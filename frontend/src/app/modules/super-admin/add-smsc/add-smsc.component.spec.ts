import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSmscComponent } from './add-smsc.component';

describe('AddSmscComponent', () => {
  let component: AddSmscComponent;
  let fixture: ComponentFixture<AddSmscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSmscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSmscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
