import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/login/signup-modal/signup-modal.module').then( m => m.SignupModalPageModule)
  },  
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then( m => m.ClientPageModule)
  },
  {
<<<<<<< HEAD
=======
    path: 'home-login',
    loadChildren: () => import('./home-login/dashboard.module').then( m => m.DashboardPageModule)
  },
 
  {
>>>>>>> 6abcf7bb1a999068ac9f844719a850161e6163bf
    path: 'pets',
    loadChildren: () => import('./dashboardpages/pets/pets.module').then( m => m.PetsPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./dashboardpages/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'favorite',
    loadChildren: () => import('./dashboardpages/favorite/favorite.module').then( m => m.FavoritePageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./dashboardpages/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'donate',
    loadChildren: () => import('./home-pages/donate/donate.module').then( m => m.DonatePageModule)
  },
  {
    path: 'whtware',
    loadChildren: () => import('./home-pages/whtware/whtware.module').then( m => m.WhtwarePageModule)
  },
  {
    path: 'whtwdo',
    loadChildren: () => import('./home-pages/whtwdo/whtwdo.module').then( m => m.WhtwdoPageModule)
  },

  {
    path: 'pet-details/:id',
    loadChildren: () => import('./dashboardpages/pets/pet-details/pet-details.module').then(m => m.PetDetailsPageModule)
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
