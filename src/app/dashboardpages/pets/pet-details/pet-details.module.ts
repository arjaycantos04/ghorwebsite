import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetDetailsPageRoutingModule } from './pet-details-routing.module';

import { PetDetailsPage } from './pet-details.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetDetailsPageRoutingModule
  ],
  declarations: [PetDetailsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PetDetailsPageModule {}
