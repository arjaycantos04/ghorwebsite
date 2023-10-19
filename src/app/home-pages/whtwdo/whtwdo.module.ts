import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhtwdoPageRoutingModule } from './whtwdo-routing.module';

import { WhtwdoPage } from './whtwdo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhtwdoPageRoutingModule
  ],
  declarations: [WhtwdoPage]
})
export class WhtwdoPageModule {}
