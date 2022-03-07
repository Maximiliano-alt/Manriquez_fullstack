import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Proveedor } from 'src/app/proveedores/services/proveedor.service';

@Injectable({
  providedIn: 'root'
})
export class VentasService {




  constructor(private http:HttpClient) { }

  addVenta(data:venta){
    return this.http.post(environment.baseUrl+'/newGuiaDeVenta',data)
  }

  getCliente(rut:string){
    return this.http.get<any>(environment.baseUrl+'/search/cliente/'+rut)
  }

  getProductos(){
    return this.http.get<producto[]>(environment.baseUrl+'/get/producto')
  }
  getVenta(){
    return this.http.get<venta[]>(environment.baseUrl+'/get/ventas').pipe(
      delay(1000)
    )
  }

  getProductoForId(data:string){
    return this.http.get<productoComprado[]>(environment.baseUrl+'/venta/get/list/product/'+data).pipe(
      delay(2000)
    )
  }

  deleteProduct(array:productoComprado[],producto:productoComprado,idVenta:string,operacion:string){

    var aux:productoComprado[] = []
    array.forEach((element:productoComprado)=>{
      if(element!= producto){
        aux.push(element)
      }
      if(element == producto && operacion == 'A'){
        element.cantidad = element.cantidad + 1
        console.log("entro a la +1")
        aux.push(element)
      }
      if(element == producto && operacion == 'R'){
        if(element.cantidad-1 == 0){
          console.log("entro a la -1")
        }
        else if(element.cantidad-1 > 0){
          element.cantidad = element.cantidad  -1
          console.log("entro a la -1 solita")
          aux.push(element)
        }
      }

    })


    return this.http.post(environment.baseUrl+'/venta/delete/producto',{aux,idVenta});
  }

  getVentaAndCliente(data:string,rut:string){
    return this.http.post(environment.baseUrl+'/get/venta/cliente',{data,rut}).pipe(
      delay(2000)
    )
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
    productos:productoComprado[

    ], //son objectos de productos
    fecha: number, //valor automatico en hora minuto segundo y fecha
    servicios: string,
    porcentaje: number,
    totalDeVenta:number,
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
      numeroGuia: string;

    }
}

export interface productoComprado{
  nombre: String,
  valor: number,
  descripcion: String,
  cantidad:number,
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

export interface cliente{
  nombre: '',
  direccion: '',
  telefono: '',
  correo: '',
  rut: '',
  totalDeCompra:0,
  historial:[]
}
