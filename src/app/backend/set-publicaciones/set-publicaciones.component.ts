import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Publicacion } from '../../models';
import { LoadingController } from '@ionic/angular';
import { FirestoregeService } from 'src/app/services/firestorege.service';


@Component({
  selector: 'app-set-publicaciones',
  templateUrl: './set-publicaciones.component.html',
  styleUrls: ['./set-publicaciones.component.scss'],
})
export class SetPublicacionesComponent implements OnInit {
  
  publicaciones:Publicacion[]=[];
  
  newPublicacion:Publicacion; 

  enableNewPublicacion=false;

  private path='Publicaciones/'; //se guardan las publicaciones en este path
  newImage='';
  newFile='';
  loading: any;

  constructor(public menuControler: MenuController,
    public firestoreService: FirestoreService,
    public  loadingCtrl: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public firestoregeService: FirestoregeService
    ) { }
    

  ngOnInit() {
    this.getPublicaciones();
  }
  /**
   * 
   * @function openMenu
   * @descripcion abre la barra lateral
   */
  openMenu(){
    console.log('open menu');
    this.menuControler.toggle('principal');
  }
  /**
   * 
   * @function guardarPublicacion
   * @descripcion guarda las publicaciones en el firestore
   */
  async guardarPublicacion(){

    this.showLoading();//mostramos el loading
    const path= 'publicaciones';
    const name=this.newPublicacion.nombre;
    const res=await this.firestoregeService.uploadImage(this.newFile,path,name); //en el storege se carga el archivo y res obtiene el enlace
    
    this.newPublicacion.foto=res;
    this.firestoreService.creatDoc(this.newPublicacion,this.path,this.newPublicacion.id).then(res =>{
      this.loading.dismiss();//cuando se cumpla la promesa cerramos el loading
      this.presentToast('bottom','Guardado con exito!!');
    
    }).catch(error=>{
      this.presentToast('bottom','no se pudo guardar los cambios!!');
    });
  }
 
  /**
   * 
   * @function getPublicaciones
   * @descripcion lee todos las publicaciones que tenemos en la base de datos 
   * subscribe()=>devuelve una respuesta de lo que esta viendo el observador 
   */
  getPublicaciones(){
    this.firestoreService.getCollection<Publicacion>(this.path).subscribe(res=>{
        //console.log(res);
        this.publicaciones=res;
    }) 
  }
  /**
   * 
   * @function delatePublicacion
   * @descripcion elimina la publicacion de la base de datos / muestra mensaje de alerta 
   */
   async delatePublicacion(publicacion:Publicacion){
    
    const alert = await this.alertController.create({
      header: 'Desea eliminarlo ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Si',
          role: 'confirm',
        /**
         * @handler dentro de esta accion se elimina el dato de la basse de datos si la conexion se hizo con exito muestra mensaje de Publicacion eliminada! sino  no se pudo eliminar!!
         */
          handler: () => {
            this.firestoreService.delateDoc(this.path,publicacion.id).then(res =>{
              
              this.presentToast('bottom','Publicacion eliminada!!');
            }).catch(error=>{
              this.presentToast('bottom','no se pudo eliminar!!');
            });
          },
        },
      ],
    });

    await alert.present();
    
    
  }
  /**
   * 
   * @function nueva
   * @descripcion crea una nueva publicacion
   */
  nueva(){
    this.enableNewPublicacion=true;
    this.newPublicacion={
      nombre:'',
      descripcion:'',
      foto: '',
      telContacto:null,
      id:this.firestoreService.getId(),
      fecha:new Date(),
      ubicacion:"",
    }
  }
  /**
   * @showLoading
   * @descripcion la funcion crea un mensaje de cargando 
   */
  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'guardando...',
      //duration: 3000,
      spinner: 'circles',
    });

    this.loading.present();
  }
  /**
   * 
   * @function  presentToast
   * @description muestra un mensaje en la parte inferior medio o superior, con una duracion de 2 seg para notificar que se hizo tal accion 
   *la posision se lo pasa por paramentros y el mensaje que quiere mostrar tambien
   */
  async presentToast(position:'top' | 'middle' |'bottom',msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: position
    });

    await toast.present();
  }
  /**
  * 
  * @function newImageUpload
  * @descripcion Subir una nueva imagen
   
  * @param event 
  * 
  */
  async newImageUpload(event:any){
    
   if (event.target.files ){
      this.newFile=event.target.files[0];
      const reader=new FileReader();
      reader.onload=((image)=>{
        this.newPublicacion.foto=image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
   
   
  }
  
}
