import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhtwdoPage } from './whtwdo.page';

describe('WhtwdoPage', () => {
  let component: WhtwdoPage;
  let fixture: ComponentFixture<WhtwdoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WhtwdoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
