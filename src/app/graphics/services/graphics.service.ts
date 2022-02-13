import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GraphicsService {

  constructor(private http:HttpClient) { }

  getCliente(){
    return this.http.get<resCliente>(environment.baseUrl+'/getCliente/estadistica').pipe(
      delay(1500)
    )
  }


}

export interface resCliente{
  status:number,
  clientes:[
    {
      nombre:string,
      totalDeCompra:number,
    }
  ]
}

export interface cliente{
    nombre:string,
    totalDeCompra:number,
  }

