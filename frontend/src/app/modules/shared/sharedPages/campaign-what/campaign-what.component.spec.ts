import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignWhatComponent } from './campaign-what.component';

describe('CampaignWhatComponent', () => {
  let component: CampaignWhatComponent;
  let fixture: ComponentFixture<CampaignWhatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignWhatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignWhatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
