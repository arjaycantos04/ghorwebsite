import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardpagesPage } from './dashboardpages.page';

describe('DashboardpagesPage', () => {
  let component: DashboardpagesPage;
  let fixture: ComponentFixture<DashboardpagesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DashboardpagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
