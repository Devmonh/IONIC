import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlreadyregisteredGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router:Router){}

  /**
   * 
   * @function  canActivate
   * @descripcion toma el estado actual del usuario , si ya inicio sesion, su primera pantalla sera siempre 
   * el home. 
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authSvc.user$.pipe(
        take(1),
        map(user=>{
          if (user){
            this.router.navigate(['/home']);
            return false;
          }else{
            console.log('user->',user);
            return true;
          }
        })
      )
    }
    
  }