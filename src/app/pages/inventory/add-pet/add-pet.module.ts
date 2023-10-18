import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPetPageRoutingModule } from './add-pet-routing.module';

import { AddPetPage } from './add-pet.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPetPageRoutingModule,
  ],
  declarations: [AddPetPage],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddPetPageModule {}
