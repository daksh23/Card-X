import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBannerComponent } from './dashboard-banner.component';

describe('DashboardBannerComponent', () => {
  let component: DashboardBannerComponent;
  let fixture: ComponentFixture<DashboardBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardBannerComponent]
    });
    fixture = TestBed.createComponent(DashboardBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
