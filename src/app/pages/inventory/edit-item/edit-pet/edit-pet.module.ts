import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPetPageRoutingModule } from './edit-pet-routing.module';

import { EditPetPage } from './edit-pet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPetPageRoutingModule
  ],
  declarations: [EditPetPage]
})
export class EditPetPageModule {}
