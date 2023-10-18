import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupModalPage } from './signup-modal.page';

describe('SignupModalPage', () => {
  let component: SignupModalPage;
  let fixture: ComponentFixture<SignupModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SignupModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
