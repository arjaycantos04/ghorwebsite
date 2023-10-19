import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetsPage } from './pets.page';
import { PetDetailsPage } from './pet-details/pet-details.page';

const routes: Routes = [
  {
    path: '',
    component: PetsPage
  },
  {
    path: 'pet-details/:id',
    component: PetDetailsPage,
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsPageRoutingModule {}
