import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-sitios-de-interes',
  templateUrl: './sitios-de-interes.page.html',
  styleUrls: ['./sitios-de-interes.page.scss'],
})
export class SitiosDeInteresPage implements OnInit {

  map=null;
  infowindow: any;
  marcadores:[]
  markers: Marker[] = [
    {
      position: {
        lat: -34.635019789887885, 
        lng: -58.398535252682805,
      },
      title: 'Herreria artistica y trabajos en general'
    },
    {
      position: {
        lat: -34.63651405060009,  
        lng: -58.478938988856356,
      },
      title: 'Outlet Blastein'
    },
    {
      position: {
        lat: -34.616755919713064, 
        lng: -58.425090641253405,
      },
      title: 'Carpinteria el umbral'
    },
    {
      position: {
        lat: -34.60732343829297, 
        lng: -58.41816522827433,
      },
      title: 'Easy Balvanera'
    },  
    {
      position: {
        lat: -34.61509136484908, 
        lng: -58.446996827877435 
      },
      title: 'Easy Caballito'
    },  
    {
      position: {
        lat: -34.5838719774047, 
        lng: -58.43623128157483 
      },
      title: 'Palermo Materiales'
    },  
    
  ];

  constructor(public menucontroler: MenuController) { }

  ngOnInit() {  
    this.loadMap();
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
   * @function  loadMap
   * @descripcion  metodo para la creacion de un mapa de google, que tendra un objeto, con atributos de 
   * latitud y longitud
   */
  loadMap() {
    // crea un nuevo mapa desde HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // crea un objeto con latitud y longitud
    const myLatLng = {lat: -34.6393847, lng: -58.4028649};
    // crea el mapa
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12,
      mapId:"1f52087ef0526978",
    });
    
    google.maps.event.addListenerOnce(this.map, 'idle', () => {

      mapEle.classList.add('show-map');
      this.renderMarkers();
      this.displayFerreteriasList() ;
             
    });

  }
  /**
   * 
   * @function   displayFerreteriasList
   * @descripcion  metodo para la creacion de un display que mostrara el listado con el titulo de
   * los marcadores existentes en el mapa.
   */
  displayFerreteriasList=()=>{
    let HTMLElement=""
    this.markers.forEach(marker=>{
      HTMLElement += `<h6>${marker.title}</h6>`  
    })
    document.getElementById("ferreterias_nombres").innerHTML=HTMLElement;
  }
  /**
   * 
   * @function  renderMarkers
   * @descripcion metodo que utiliza la funcion agregar marcadores y los renderiza para mostrarlos
   * en el mapa
   */
  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
      console.log(this.marcadores)
    
    });
  }
  /**
   * 
   * @function  addMarker
   * @descripcion metodo que agrega los marcadore creados al mapa, utilizando los atributos del marcador
   * 
   */
  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title,
      icon:"./assets/construction.png"
    });
    }



}
