import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database:AngularFirestore) { }

  
 /**
   * 
   * @function  creatDoc
   * @descripcion genera un documento en la base de datos 
   */
  creatDoc(data: any, path: string, id: string){
    const collection= this.database.collection(path);
    return collection.doc(id).set(data)
  }
   /**
   * 
   * @function getDoc
   * @descripcion lee los datos del documento de la base date 
   */
  getDoc(path: string, id:string){
    const collection= this.database.collection(path); //apuntamos a la coleccion
    return collection.doc(id).valueChanges(); //apuntamos a la collecion el id y vemos el observable
  }
  /**
   * 
   * @function  delateDoc
   * @descripcion elimina los datos del documento en la base de datos
   */
  delateDoc(path: string, id:string){
    const collection= this.database.collection(path); //apuntamos a la coleccion
    return collection.doc(id).delete();
  }
    /**
   * 
   * @function   updateDoc
   * @descripcion actualiza los datos de la base de datoss
   */

  updateDoc(data: any, path: string, id: string){
    const collection= this.database.collection(path); //apuntamos a la coleccion
    return collection.doc(id).update(data);
  }
      /**
   * 
   * @function     getId
   * @descripcion crea un id en la base de datos
   */

  getId(){
    return this.database.createId();
  }
        /**
   * 
   * @function   getCollection
   * @descripcion obtiene toda la coleccion de datos de la base de datos
   */
  
  getCollection<tipo>(path: string){
    const collection= this.database.collection<tipo>(path); //apuntamos a la coleccion
    return collection.valueChanges();//valueChanges() es un observable que obtiene todos los datos pero en tiempo real

  }
}
