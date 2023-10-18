import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordChangeModalPage } from './password-change-modal.page';

describe('PasswordChangeModalPage', () => {
  let component: PasswordChangeModalPage;
  let fixture: ComponentFixture<PasswordChangeModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PasswordChangeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
