import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnnouncementDetailsModalPage } from './announcement-details-modal.page';

describe('AnnouncementDetailsModalPage', () => {
  let component: AnnouncementDetailsModalPage;
  let fixture: ComponentFixture<AnnouncementDetailsModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnnouncementDetailsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
