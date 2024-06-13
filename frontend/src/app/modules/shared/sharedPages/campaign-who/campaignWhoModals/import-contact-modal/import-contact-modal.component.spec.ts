import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContactModalComponent } from './import-contact-modal.component';

describe('ImportContactModalComponent', () => {
  let component: ImportContactModalComponent;
  let fixture: ComponentFixture<ImportContactModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportContactModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
