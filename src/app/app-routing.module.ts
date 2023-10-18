import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'inventory',
    loadChildren: () => import('./pages/inventory/inventory.module').then(m => m.InventoryPageModule)
  },
  {
    path: 'adoption',
    loadChildren: () => import('./pages/adoption/adoption.module').then(m => m.AdoptionPageModule)
  },
  {
    path: 'announcement',
    loadChildren: () => import('./pages/announcement/announcement.module').then(m => m.AnnouncementPageModule)
  },
  {
    path: 'add-pet',
    loadChildren: () => import('./pages/inventory/add-pet/add-pet.module').then(m => m.AddPetPageModule)
  },
  {
    path: 'edit-item/:id',
    loadChildren: () => import('./pages/inventory/edit-item/edit-item.module').then(m => m.EditItemPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login-signup/login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: 'notifications',
    component: NotificationsComponent,
  },

  {
    path: 'edit-pet/:id', // Make sure to include a parameter, such as pet ID, if needed
    loadChildren: () => import('./pages/inventory/edit-item/edit-pet/edit-pet.module').then(m => m.EditPetPageModule)
  },
  
    
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
