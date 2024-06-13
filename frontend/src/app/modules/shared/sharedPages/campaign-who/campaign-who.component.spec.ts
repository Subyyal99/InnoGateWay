import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignWhoComponent } from './campaign-who.component';

describe('CampaignWhoComponent', () => {
  let component: CampaignWhoComponent;
  let fixture: ComponentFixture<CampaignWhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignWhoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignWhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
