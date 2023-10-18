import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordChangeModalPage } from './password-change-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordChangeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordChangeModalPageRoutingModule {}
