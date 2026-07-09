import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes as NgRoutes } from '@angular/router';
import { RoutesPage } from './routes.page';

const routes: NgRoutes = [{ path: '', component: RoutesPage }];

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [RoutesPage],
})
export class RoutesPageModule {}
