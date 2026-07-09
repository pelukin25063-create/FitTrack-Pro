import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ProgressPage } from './progress.page';

const routes: Routes = [{ path: '', component: ProgressPage }];

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [ProgressPage],
})
export class ProgressPageModule {}
