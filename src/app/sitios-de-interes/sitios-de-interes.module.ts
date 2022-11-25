import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SitiosDeInteresPageRoutingModule } from './sitios-de-interes-routing.module';

import { SitiosDeInteresPage } from './sitios-de-interes.page';

@NgModule({ 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SitiosDeInteresPageRoutingModule
  ],
  declarations: [SitiosDeInteresPage]
})
export class SitiosDeInteresPageModule {}
   