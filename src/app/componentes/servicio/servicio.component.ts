import { Component, Input, OnInit } from '@angular/core';
import {Publicacion} from '../../models'

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss'],
})
export class ServicioComponent implements OnInit {
  @Input() publicacion: Publicacion;
  constructor() { }

  ngOnInit() {}

  /**
   * 
   * @function contactar
   * @descripcion redirige hacia la aplicacion whatsapp,
   *  agregandole +54 y el numero de telefono ingresado en la publicacion
   */
  contactar(num:number){
    
    let url="https://api.whatsapp.com/send?phone="+54+num;
    window.open(url);
  }

  /**
   * 
   * @function   vermapa
   * @descripcion redirige hacia la aplicacion externa de googlemaps,
   *  agregandole el Barrio ingresado en la publicacion al momento de crearla
   */
  vermapa(string:string){
    
    let url="https://www.google.com.ar/maps/place/"+string;
    window.open(url);
  }
    /**
   * 
   * @function   contactarTel
   * @descripcion recibe el numero con el que se registro el ususario y le agrega el 54 para realizar llamadas 
   */
  contactarTel(num:number){
    
    return 54+num;
  }
}
