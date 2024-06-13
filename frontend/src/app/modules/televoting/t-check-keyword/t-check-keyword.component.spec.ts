import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TCheckKeywordComponent } from './t-check-keyword.component';

describe('TCheckKeywordComponent', () => {
  let component: TCheckKeywordComponent;
  let fixture: ComponentFixture<TCheckKeywordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TCheckKeywordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TCheckKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
