import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router:Router){}

    /**
   * 
   * @function  canActivate
   * @descripcion toma el estado actual del usuario, si aun no inicio sesion, toma como unica ruta 
   * posible la primera pantalla del login
   */

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authSvc.user$.pipe(
      take(1),
      map(user=>{
        if (user){
          console.log('user->',user);
          return true;
        }else{
          this.router.navigate(['/login']);
          return false;
        }
      })
    )
  }
  
}
