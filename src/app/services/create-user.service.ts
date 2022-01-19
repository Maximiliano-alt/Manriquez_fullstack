import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from '../../var';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(private http:HttpClient) { }

  crearUsuario(user:User){
    return this.http.post<res>(urls.URL_BACK+'/new',user);
  }

}

export interface User{
  rut: string,
  password: string,
}

export interface res{
  status:number,
  mensaje:string
}