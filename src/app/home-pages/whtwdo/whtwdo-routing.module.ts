import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhtwdoPage } from './whtwdo.page';

const routes: Routes = [
  {
    path: '',
    component: WhtwdoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhtwdoPageRoutingModule {}
