import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { InventoryPageRoutingModule } from './inventory-routing.module';
import { InventoryPage } from './inventory.page';
import { AddPetPageModule } from './add-pet/add-pet.module';
import { EditItemPageRoutingModule } from './edit-item/edit-item-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryPageRoutingModule,
    AddPetPageModule,
    EditItemPageRoutingModule // Add the AddPetPageModule here
  ],
  declarations: [InventoryPage]
})
export class InventoryPageModule {}
