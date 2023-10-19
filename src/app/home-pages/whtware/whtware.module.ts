import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhtwarePageRoutingModule } from './whtware-routing.module';

import { WhtwarePage } from './whtware.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhtwarePageRoutingModule
  ],
  declarations: [WhtwarePage]
})
export class WhtwarePageModule {}
