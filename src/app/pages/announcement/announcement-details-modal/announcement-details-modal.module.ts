import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnouncementDetailsModalPageRoutingModule } from './announcement-details-modal-routing.module';

import { AnnouncementDetailsModalPage } from './announcement-details-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnouncementDetailsModalPageRoutingModule
  ],
  declarations: [AnnouncementDetailsModalPage]
})
export class AnnouncementDetailsModalPageModule {}
