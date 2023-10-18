import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditItemPageRoutingModule } from './edit-item-routing.module';

import { EditItemPage } from './edit-item.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditItemPageRoutingModule,
    
  ],
  declarations: [EditItemPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditItemPageModule {}
