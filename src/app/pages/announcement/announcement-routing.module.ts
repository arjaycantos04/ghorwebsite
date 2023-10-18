import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnouncementPage } from './announcement.page';

const routes: Routes = [
  {
    path: '',
    component: AnnouncementPage
  },
  {
    path: 'announcement-details-modal',
    loadChildren: () => import('./announcement-details-modal/announcement-details-modal.module').then( m => m.AnnouncementDetailsModalPageModule)
  },

 
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnouncementPageRoutingModule {}
