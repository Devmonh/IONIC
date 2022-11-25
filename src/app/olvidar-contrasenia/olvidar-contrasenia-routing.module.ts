import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlvidarContraseniaPage } from './olvidar-contrasenia.page';

const routes: Routes = [
  {
    path: '',
    component: OlvidarContraseniaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OlvidarContraseniaPageRoutingModule {}
