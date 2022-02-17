import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private cookie: CookieService) { }

  login(data:userLogin){
    var aux = this.http.post<res>(environment.baseUrl+'/login',data)
    console.log(this.cookie.get('_pipo'))
    aux.subscribe(
      res=>{
        var date = new Date();
        date.setTime(date.getTime() + (20 * 1000));
        this.cookie.set('_pipo',res.mensaje, { expires: date })
      }
    )
    return {status:200,mensaje:"login exitoso"}
  }

  register(data:user){
    return this.http.post<res>(environment.baseUrl+'/new',data)
  }


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