import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-verificacion-email',
  templateUrl: './verificacion-email.page.html',
  styleUrls: ['./verificacion-email.page.scss'],
})
export class VerificacionEmailPage  {
   user$:Observable<User>=this.authSvc.afAuth.user;//en caso de eque este logueado recuperamos usuario
  constructor(private authSvc:AuthService) { }

   /**
   * 
   * @function  onReenviarEmail
   * @descripcion metodo utilizado para el caso en que el usuario no recibiera el mail para realizar
   * la verificacion de usuario. Se renviara el mail para verificar correo. Es una promesa, y llama
   * a la funcion sendEmailVerificationEmail.
   * En caso de error lo muestra x consola
   * 
   */ 
 async onReenviarEmail():Promise<void>{
    try{
      await this.authSvc.sendEmailVerificationEmail();
    }
    catch(error){
      console.log('Error->',error);
    }
  }
  
   /**
   * 
   * @function    ngOnDestroy
   * @descripcion metodo que llama a la funcion de deslogueo
   **/
  ngOnDestroy():void{
    this.authSvc.logout();
  }
}
