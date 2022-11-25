import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(
    private authSvc:AuthService,
    private router:Router,
    public fb:FormBuilder,
    public alertController:AlertController,
    public navControl: NavController
    ) { 

  }
  
ngOnInit() {
  }
  /**
   * 
   * @function  ingresar
   * @descripcion evalua que la contraseña y email sean validos y correspondan a un usuario registrado y verificado
   */
async ingresar(email,password){
  try{
    const user= await this.authSvc.login(email.value,password.value);
  
  if (user){
      //console.log('Usuario ingresado');
      const estaVerificado=this.authSvc.siEmailVerificado(user);
      this.redireccionarUsuario(estaVerificado);
      //console.log('verificacion->',estaVerificado);
    }
  else{
     const alert = await this.alertController.create({
      header: 'Datos incorrectos',
      message: 'Los datos ingresados no son correctos',
      buttons: ['Aceptar']
    });

    await alert.present();

  }
}

catch(error){
  console.log('Error',error);
}
}
  /**
   * 
   * @function  onLoginGoogle
   * @descripcion permite el ingreso a la app con una cuenta de google, verifica la ceunta de gmail
   * si esta verificada le permite el ingreso al home
   */
async onLoginGoogle(){
  try{
    const user = await this.authSvc.loginGoogle();
    if(user){
      console.log('User->',user);
      //Todo: CheckEmail
      const estaVerificado=this.authSvc.siEmailVerificado(user);
      this.redireccionarUsuario(estaVerificado);
      //console.log('verificacion->',estaVerificado);
    }
  }
  catch(error){
    console.log('Error',error);
  }
}
  /**
   * 
   * @function  redireccionarUsuario
   * @descripcion se compruebea el estado de verificado del ususario, si es true se lo redirecciona
   * al home, si es falso se lo redirecciona a la pantalla de verificacion del mail 
   */

private redireccionarUsuario(estaVerificado:boolean):void{
  if(estaVerificado){
    this.router.navigate(['home']);//se redirecciona a la pagina home
  }
  else{
    this.router.navigate(['verificacion-email']); // se direciona a la pagina verfificacionde email
  }

}
}
