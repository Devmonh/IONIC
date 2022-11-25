import { Injectable } from '@angular/core';
import { sendEmailVerification } from 'firebase/auth';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { signInWithPopup, authInstance$, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import {AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/compat/firestore';
import { Observable,of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { getuid } from 'process';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {
    
  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs:AngularFirestore) { 
    this.user$= this.afAuth.authState.pipe(
      switchMap((user)=>{
        if (user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }
  /**
   * 
   * @function  login
   * @descripcion metodo para el logueo del usuario, es una promesa y requiere mail y contraseña.
   * llama a la funcion de Authservice(amgular/fire) para el logueo con mail y password y da de 
   * alta al usuario 
   */
async login(email:string, password: string):Promise<User>{
 
  try{
    const { user }= await this.afAuth.signInWithEmailAndPassword(email,password);
    this.updateUserDate(user);
    return user;
  }
  catch(error){
    console.log('error->', error);
  }  
}
  /**
   * 
   * @function  logout
   * @descripcion metodo para el deslogueo del usuario, es una promesa.
   * Llama a la funcion signOut de Authservice(angular/fire) para el deslogueo.
   * En caso de error lo muestra x consola
   */
async logout():Promise<void>{
  try{
    await this.afAuth.signOut();
  }
  catch(error){
    console.log('error->', error);
  } 
}
  /**
   * 
   * @function  register
   * @descripcion metodo para el registro  del usuario, es una promesa.
   * Llama a la funcion createUserWithEmailAndPassword de Authservice(angular/fire) para la creacion 
   * del usuario, con los parametros requeridos de mail y contraseña. Eniva un mail al correo ingre4sado
   * para completar con el registro
   * En caso de error lo muestra x consola
   */
async register(email:string, password: string):Promise<User>{
  try{
    const { user }= await this.afAuth.createUserWithEmailAndPassword(email,password);
    await this.sendEmailVerificationEmail();
    return user;
  }
  catch(error){
    console.log('error->', error);
  }
}
  /**
   * 
   * @function  loginGoogle
   * @descripcion metodo para el logueo con cuenta google del usuario, es una promesa.
   * Llama a la funcion signInWithPopup de Authservice(angular/fire) para el logueo consultando al
   * GoogleAuthProvider, servicio de firebase. En caso de corroborar la existencia de la cuenta
   * se da de alta al usuario
   * En caso de error lo muestra x consola
   */
async loginGoogle():Promise<User>{
  try{
    const { user }= await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.updateUserDate(user);
    return user;
  }
  catch(error){
    console.log('error->', error);
  } 
}
 /**
   * 
   * @function  resetPassword
   * @descripcion metodo para el reseteo de la contraseña del usuario, es una promesa.
   * Llama a la funcion sendPasswordResetEmail de Authservice(angular/fire) para el reseteo, servicio de firebase. 
   * Se envia un mail al usuario para seguir los pasos para resetear
   * En caso de error lo muestra x consola
   */
async resetPassword(email:string):Promise<void>{
  try{
    return  this.afAuth.sendPasswordResetEmail(email);
   
  }
  catch(error){
    console.log('error->', error);
  }
}
 /**
   * 
   * @function  sendEmailVerificationEmail
   * @descripcion metodo para el envio de un mail al usuario para que verifique su correo, es una promesa.
   * Llama a la funcion sendEmailVerification de Authservice(angular/fire) para el envio de mails,
   *  es un servicio de firebase. 
   * En caso de error lo muestra x consola
   */
async sendEmailVerificationEmail():Promise<void>{
  try{
    return (await this.afAuth.currentUser).sendEmailVerification();
  }
  catch(error){
    console.log('error->', error);
  } 
}
 /**
   * 
   * @function  siEmailVerificado
   * @descripcion metodo para el envio de un mail establecer el estado del mail ingresado por el 
   * usuario.Si el email es verificado devuelve true sino false
   */
 siEmailVerificado(user:User):boolean{
  return user.emailVerified=== true? true :false;} 
 /**
   * 
   * @function  updateUserDate
   * @descripcion metodo para dar de alta un usuario, asignarle una identificacion.
  
   */
private updateUserDate(user:User){
  const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  const data:User={
    uid:user.uid,
    email:user.email,
    emailVerified: user.emailVerified,
    displayName:user.displayName,
  };
  return userRef.set(data, { merge:true});
}
//
 /**
   * 
   * @function  getuid
   * @descripcion metodo para retornar el identificador del usuario. 
   */
async getuid(){
  const user= await this.afAuth.currentUser;
  if(user===undefined){
    return null;
  }
  else{
    return user.uid;
  } 
}
}
