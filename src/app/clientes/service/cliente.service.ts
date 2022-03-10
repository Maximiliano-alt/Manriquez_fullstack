import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';
import { productoComprado } from 'src/app/ventas/services/ventas.service';


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
      delay(1000)
    )
  }

  getOneClient(data:string){
    return this.http.get<cliente>(environment.baseUrl+'/search/cliente/'+data).pipe(
      delay(1000)
    )
  }

  getVentasClient(data:string){
    return this.http.get(environment.baseUrl+'/get/ventas/for/client/'+data).pipe(
      delay(1000)
    )
  }

  actualizarVenta(idVenta:string,rut:string,array:any[],producto:any,indicador:string){


    return this.http.post(environment.baseUrl+'/actualizar/carrito/Cliente',{idVenta,rut})
  }


  deleteCliente(rut:string){
    return this.http.post(environment.baseUrl+'/delete/cliente',{rut});
  }

  modificarEstadoVenta(estado:string,rut:string,idVenta:string){
    var aux = ''
    if(estado == 'pagado'){
      aux = 'pendiente'
    }
    if(estado =='pendiente'){
      aux = 'pagado'
    }
    return this.http.post(environment.baseUrl+'/modificar/estado',{aux,rut,idVenta});
  }

  deleteVenta(rut:string,id:string){
    return this.http.post(environment.baseUrl+'/delete/venta',{rut,id});
  }

  calcularTotalVenta(rut:string){
    return this.http.post(environment.baseUrl+'/calcular/total/Venta',{rut});
  }


  updateVenta(id:string){
    return this.http.post(environment.baseUrl+'/update/venta',{id});
  }

  actualizarProducto_add(id:any){
    return this.http.post(environment.baseUrl+'/modify/add/cantidad',{id})
  }
  actualizarProducto_delete(id:any){
    return this.http.post(environment.baseUrl+'/modify/delete/cantidad',{id})
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


