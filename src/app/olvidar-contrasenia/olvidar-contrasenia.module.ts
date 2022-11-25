import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvidarContraseniaPageRoutingModule } from './olvidar-contrasenia-routing.module';

import { OlvidarContraseniaPage } from './olvidar-contrasenia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OlvidarContraseniaPageRoutingModule
  ],
  declarations: [OlvidarContraseniaPage]
})
export class OlvidarContraseniaPageModule {}
