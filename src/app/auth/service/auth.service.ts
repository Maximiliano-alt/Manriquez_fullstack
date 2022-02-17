import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private cookie: CookieService) { }

  login(data:user){
    var aux = this.http.post<res>(environment.baseUrl+'/login',data)
    
    aux.subscribe(
      res=>{
        this.cookie.set('token',res.mensaje)
      }
    )
    return {status:200,mensaje:"login exitoso"}
  }
}
export interface user{
  rut:string,
  pass:string,
}

export interface res{
  status:number,//200 o 500
  mensaje:string //token en login y en caso contrario mensaje
}