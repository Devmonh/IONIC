import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olvidar-contrasenia',
  templateUrl: './olvidar-contrasenia.page.html',
  styleUrls: ['./olvidar-contrasenia.page.scss'],
})
export class OlvidarContraseniaPage {

  constructor(private authSvc:AuthService,private router: Router) { }

  /**
   * 
   * @function  onResetearContra
   * @descripcion metodo para llamar a la funcion resetpassword que brinda AuthService firebase,
   * restablece la contraseña del ususario, y lo rutea al login para ingresar con su nueva contraseña  
   */
  async onResetearContra(email){
    try{
      this.authSvc.resetPassword(email.value);
      this.router.navigate(['/login']);
    }
    catch(error){
      console.log('error->',error);
    }
  }
}
