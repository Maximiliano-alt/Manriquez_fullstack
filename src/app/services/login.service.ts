import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from '../../var';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  crearUsuario(user:User){
    //recibimos el user de tipo user y se lo mandamos al back
    return this.http.post<res>(urls.URL_BACK + '/login',user);
  }

}

export interface User{
  rut: string,
  password: string,
}

export interface res{
  status:number,//200 o 500
  mensaje:string //token en login y en caso contrario mensaje
}