import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetPublicacionesComponent } from './set-publicaciones/set-publicaciones.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SetPublicacionesComponent 
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class BackendModule { }
