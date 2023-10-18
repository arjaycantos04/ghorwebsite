import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnouncementDetailsModalPage } from './announcement-details-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AnnouncementDetailsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnouncementDetailsModalPageRoutingModule {}
