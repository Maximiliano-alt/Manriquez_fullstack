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
        var date = Date.now();
        var expired = new Date(date).toString().split(" ")
        var dateTime= expired[4].split(":")
        const newMinuto =parseInt( dateTime[1])+1
        dateTime[1] = newMinuto.toString()
        console.log(dateTime)
        this.cookie.set('_pipo',res.mensaje)
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