import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then( m => m.ClientPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'dashboardpages',
    loadChildren: () => import('./dashboardpages/dashboardpages.module').then( m => m.DashboardpagesPageModule)
  },
  {
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
