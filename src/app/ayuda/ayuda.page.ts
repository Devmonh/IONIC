import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {

  constructor(public menucontroler: MenuController) { }

  ngOnInit() {
  }
    /**
   * 
   * @function openMenu
   * @descripcion abre la barra lateral
   */
  openMenu() {
    console.log('open menu');
    this.menucontroler.toggle('principal');
  }
}
