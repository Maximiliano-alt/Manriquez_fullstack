import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { cliente } from 'src/app/clientes/service/cliente.service';
@Injectable({
  providedIn: 'root'
})
export class VentasService {




  constructor(private http:HttpClient) { }

  addVenta(data:venta){
    return this.http.post(environment.baseUrl+'/newOrdenDeCompra',data)
  }

  getCliente(rut:string){
    return this.http.get<any>(environment.baseUrl+'/search/cliente/'+rut)
  }

  getProductos(){
    return this.http.get<producto[]>(environment.baseUrl+'/get/producto')
  }

}


export interface venta{
  id_Venta: number, //valor automatico en hora minuto segundo y fecha
    cliente: {
        nombre: string,
        apellidos: string,
        direccion: string,
        telefono: string,
        correo: string,
        rut: string,
    }, //son objectos de Cliente
    estado: string,
    productos: 
    [
        {
            nombre: string,
            valor: number,
            descripcion: string,
        }
    ]
    , //son objectos de productos
    fecha: number, //valor automatico en hora minuto segundo y fecha
    servicios: string,
    porcentaje: number
}

export interface producto{
  nombre: string,
  valor: number,
  descripcion: string,
  categoria:string,
  stock:number,
  vecesComprado:number,
  color:string,
  imagen:string,
}

