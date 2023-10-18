import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardpagesPageRoutingModule } from './dashboardpages-routing.module';

import { DashboardpagesPage } from './dashboardpages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardpagesPageRoutingModule
  ],
  declarations: [DashboardpagesPage]
})
export class DashboardpagesPageModule {
  
}
