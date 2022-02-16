import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient ) { }


  add_cliente(data:cliente){
    return this.http.post(environment.baseUrl+'/createCliente',data);
  }




}

export interface cliente{
  nombre: string,
  direccion: String,
  telefono: String,
  correo: String,
  rut: String,
  totalDeCompra:Number,
  historial:
  //historial de compras
  []
}
