import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

// Unidad 2: Navegación
// Cada pestaña carga su módulo de forma diferida (lazy loading).
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'workouts',
        loadChildren: () =>
          import('../pages/workouts/workouts.module').then(m => m.WorkoutsPageModule),
      },
      {
        path: 'routes',
        loadChildren: () =>
          import('../pages/routes/routes.module').then(m => m.RoutesPageModule),
      },
      {
        path: 'progress',
        loadChildren: () =>
          import('../pages/progress/progress.module').then(m => m.ProgressPageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../pages/profile/profile.module').then(m => m.ProfilePageModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
