import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService,token } from '../service/auth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,  CanLoad {
 
  constructor(private cookie: CookieService,private service: AuthService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    var data = localStorage.getItem('_pipo')
    if(data==null){
      this.router.navigate(['/auth/login'])
      return false
    }
    else{
    
      return true
    }


  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    
    var data = localStorage.getItem('_pipo')
    if(data==null){
      this.router.navigate(['/auth/login'])
      return false
    }
    else{
      return true
    }
  }
}
