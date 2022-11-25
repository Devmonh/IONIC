import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SitiosDeInteresPage } from './sitios-de-interes.page';

const routes: Routes = [
  {
    path: '',
    component: SitiosDeInteresPage
  }
];  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SitiosDeInteresPageRoutingModule {}
 