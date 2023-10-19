import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetDetailsPage } from './pet-details.page';
import { PetsPage } from '../pets.page';

const routes: Routes = [
  {
    path: 'pet-details/:id',
    component: PetDetailsPage
  },
  {
    path: 'pets',
    component: PetsPage
  },

  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetDetailsPageRoutingModule {}
