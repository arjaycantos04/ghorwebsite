import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhtwarePage } from './whtware.page';

describe('WhtwarePage', () => {
  let component: WhtwarePage;
  let fixture: ComponentFixture<WhtwarePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WhtwarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
