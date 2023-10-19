import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhtwarePage } from './whtware.page';

const routes: Routes = [
  {
    path: '',
    component: WhtwarePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhtwarePageRoutingModule {}
