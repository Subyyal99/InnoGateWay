import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignWhenComponent } from './campaign-when.component';

describe('CampaignWhenComponent', () => {
  let component: CampaignWhenComponent;
  let fixture: ComponentFixture<CampaignWhenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignWhenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignWhenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
