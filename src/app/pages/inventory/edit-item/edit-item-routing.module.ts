import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditItemPage } from './edit-item.page';

const routes: Routes = [
  {
    path: '', // The base path for EditItemPage
    component: EditItemPage,
  },
  {
    path: ':petId', // This route parameter will capture the pet's ID
    component: EditItemPage,
  },
  {
    path: 'edit-pet',
    loadChildren: () => import('./edit-pet/edit-pet.module').then( m => m.EditPetPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditItemPageRoutingModule {}
