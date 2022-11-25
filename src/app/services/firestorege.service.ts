import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { resolve } from 'dns';
import { timeout } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoregeService {

  constructor(public fireStorage:AngularFireStorage) { }

/**
 * 
 * @function uploadImage
 * @descripcion recibe un archivo , una ruta y un nombre y se obtine el
 * el link del enlace donde esta el archivo
 */
  uploadImage(file:any, path:string,nombre:string): Promise<string>{
    return new Promise(resolve=>{

      const filePath = path+ '/' +nombre;
      const ref = this.fireStorage.ref(filePath);
      const task = ref.put(file);// task tarea de subir una foto //se sube un aarchivo y se guarda en task
      task.snapshotChanges().pipe( //snapshotChanges()-> pendiente de los cambios
        finalize(() => { //cuando se finalice que suba del archivo  obtenemos el enlace del archivo
           ref.getDownloadURL() .subscribe(res=>{
            const downloadURL=res;
            resolve(downloadURL);
            return;
           });
        }
     ))
    .subscribe();
      //resolve('este es el enlace');
    });
  }

}

