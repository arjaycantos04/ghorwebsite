import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  {
    path: 'signup-modal',
    loadChildren: () => import('./signup-modal/signup-modal.module').then( m => m.SignupModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPageRoutingModule {}
