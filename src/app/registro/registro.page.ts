import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

 

  constructor(private authSvc:AuthService,private router:Router) { 
    
  }
    
  ngOnInit() {
  }

  /**
   * 
   * @function  registrarse
   * @descripcion metodo para el registro de usuarios que llama a la funcion de register de auth.service.ts
   * que requiere los parametros de email y password, se le asigna el estado de verificado si el mail
   * fue verificado y se lo redirecciona al home  
   */
    async registrarse(email,password){
      try{
        const user=await this.authSvc.register(email.value,password.value);
        if(user){
          //console.log('User->',user);
          const estaVerficado= this.authSvc.siEmailVerificado(user);
          this.redireccionarUsuario(estaVerficado);
        }
      }
      catch(error){
          console.log('Error',error);
      }
    }
  /**
   * 
   * @function  redireccionarUsuario
   * @descripcion metodo para redireccionar al usuario dependiendo del esta de verificado o no, 
   * si es verdadero se lo redirige al home, si es falso a verifcacion-email
   */
    private redireccionarUsuario(estaVerificado:boolean):void{
      if(estaVerificado){
        this.router.navigate(['home']);
      }
      else{
        this.router.navigate(['verificacion-email']); 
      }
    
    }
  }
  

