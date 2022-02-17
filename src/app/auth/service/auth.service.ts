import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token:string|null
  constructor(private http: HttpClient,private cookie: CookieService) {
    this.token = localStorage.getItem('_pipo')
   }

  login(data:userLogin){
    return this.http.post<res>(environment.baseUrl+'/login',data)
  }


  
  createCookie(data:string,check:boolean){
    localStorage.setItem('_pipo',data)
    this.token = localStorage.getItem('_pipo')
  }

  
  register(data:user){
    return this.http.post<res>(environment.baseUrl+'/new',data)
  }

  validarToken(data:token){
    return this.http.post<res>(environment.baseUrl +'/validate',data)
  }


}
export interface token{
  token:string|null
}
export interface user{
  nombre:string,
  rut:string,
  email:string,
  pass:string,
}
export interface userLogin{
  rut:string,
  pass:string,
}

export interface res{
  status:number,//200 o 500
  mensaje:string //token en login y en caso contrario mensaje
}
