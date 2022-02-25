import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient ) { }


  add_cliente(data:cliente){
    return this.http.post(environment.baseUrl+'/createCliente',data);
  }

  getClientes(){
    return this.http.get<cliente[]>(environment.baseUrl+'/verClientes').pipe(
      delay(2000)
    )
  }

  getOneClient(data:string){
    return this.http.get<cliente>(environment.baseUrl+'/search/cliente/'+data).pipe(
      delay(2000)
    )
  }

  getVentasClient(data:string){
    return this.http.get(environment.baseUrl+'/get/ventas/for/client/'+data).pipe(
      delay(2000)
    )
  }


}

export interface cliente{
  nombre: string,
  direccion: string,
  telefono: string,
  correo: string,
  rut: string,
  totalDeCompra:number,
  
}
export interface ventaCliente{
  nombre: string,
  direccion: string,
  telefono: string,
  correo: string,
  rut: string,
  totalDeCompra:number,
  historial:[]
}


