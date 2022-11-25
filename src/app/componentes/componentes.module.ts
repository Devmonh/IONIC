import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioComponent } from './servicio/servicio.component';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ServicioComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ], exports:[
    ServicioComponent,
  ]
})
export class ComponentesModule { }
