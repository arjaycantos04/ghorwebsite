import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPetPage } from './edit-pet.page';

describe('EditPetPage', () => {
  let component: EditPetPage;
  let fixture: ComponentFixture<EditPetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditPetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
