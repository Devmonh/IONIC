import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { Publicacion } from '../models';
import { MenuController } from '@ionic/angular';
//import { SetPublicacionesComponent } from '../backend/set-publicaciones/set-publicaciones.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private path='Publicaciones/';
  publicaciones:Publicacion[]=[];


  constructor(
    public menucontroler: MenuController,
    public authService:AuthService,
    private router:Router,
    public firestoreService: FirestoreService,
   // public setPublicacionesComponent: SetPublicacionesComponent
      
    
  ) { 
    this.loadPublicaciones();
  }

  ngOnInit() {
  }
  /**
   * 
   * @function openMenu
   * @descripcion abre la barra/menu lateral
   */
  openMenu() {
    console.log('open menu');
    this.menucontroler.toggle('principal');
  }

  /**
   * 
   * @function  loadPublicaciones
   * @descripcion va a la base de datos hace una consulta en estado observador
   */
  loadPublicaciones(){
    this.firestoreService.getCollection<Publicacion>(this.path).subscribe( res =>{ // Publicacion es el tipo de dato queremos recibir de esa colleccion
      console.log(res);
      this.publicaciones=res;
    })
  }


}
