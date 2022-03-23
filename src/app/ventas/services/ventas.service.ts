import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Proveedor } from 'src/app/proveedores/services/proveedor.service';

@Injectable({
  providedIn: 'root'
})
export class VentasService {




  constructor(private http:HttpClient) { }

  addVenta(data:venta){
    return this.http.post(environment.baseUrl+'/newGuiaDeVenta',data);
  }

  getCliente(rut:string){
    return this.http.get<any>(environment.baseUrl+'/search/cliente/'+rut);
  }

  getProductos(){
    return this.http.get<producto[]>(environment.baseUrl+'/get/producto');
  }
  getVenta(){
    return this.http.get<venta[]>(environment.baseUrl+'/get/ventas');
  }

  getProductoForId(data:string){
    return this.http.get<productoComprado[]>(environment.baseUrl+'/venta/get/list/product/'+data);
  }


  deleteProduct(array:productoComprado[],producto:productoComprado,idVenta:string,operacion:string){

    var aux:productoComprado[] = [] //arreglo auxiliar
    array.forEach((element:productoComprado)=>{ //recorremos el array de productos
      if(element!= producto){ //si el elemento es distinto del que se esta edita pushealo
        aux.push(element)
      }
      if(element == producto && operacion == 'A'){ //si es suma añadele uno
        element.cantidad = element.cantidad + 1
        aux.push(element) //luego pushealo
      }
      if(element == producto && operacion == 'R'){ //si es resta
        if(element.cantidad-1 == 0){ //ve si es 0 con la resta para que no las embarres
        }
        else if(element.cantidad-1 > 0){ //no es cero con la resta
          element.cantidad = element.cantidad  -1 //restale entonces
          aux.push(element)//pushealo
        }
      }

    })


    return this.http.post(environment.baseUrl+'/venta/delete/producto',{aux,idVenta});
  }

  getVentaAndCliente(data:string,rut:string){
    return this.http.post(environment.baseUrl+'/get/venta/cliente',{data,rut})
  }

  verify_amount(id:any){
    return this.http.post(environment.baseUrl+'/verify/cantidad',{id})
  }

  addAbono(valorAbono:number,idVenta:any){
    return this.http.post(environment.baseUrl+'/add/abono',{valorAbono,idVenta});
  }

}


export interface venta{
  id_Venta: number, //valor automatico en hora minuto segundo y fecha
    cliente: {
        nombre: string,
        apellidos: string,
        direccion: string,
        comuna:string,
        ciudad:string,
        telefono: string,
        correo: string,
        rut: string,
    }, //son objectos de Cliente
    estado: string,
    productos:productoComprado[

    ], //son objectos de productos
    fecha: number, //valor automatico en hora minuto segundo y fecha
    servicios:servicio[],
    porcentaje: number,
    totalDeVenta:number,
    abono:number,
    envio:string,
    proveedor:{
      nombre: string;
      rut: string;
      nombreContacto: string;
      direccion: string;
      telefono: string;
      atencion: string;
      correoAtencion: string;
      retira: string;
    },
    comentario:string
}

export interface servicio{
  nombre:string,
  valor:number,
}

export interface productoComprado{
  nombre: String,
  valor: number,
  unidadMedida:String,
  descripcion: String,
  cantidad:number,
}


export interface producto{
  nombre: string,
  valor: number,
  unidadMedida:string,
  descripcion: string,
  categoria:string,
  stock:number,
  vecesComprado:number,
  color:string,
  imagen:string,
}

export interface cliente{
  nombre: '',
  direccion: '',
  comuna: '',
  ciudad: '',
  telefono: '',
  correo: '',
  rut: '',
  totalDeCompra:0,
  historial:[]
}
