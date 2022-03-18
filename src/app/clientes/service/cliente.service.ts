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
    return this.http.get<cliente>(environment.baseUrl+'/search/cliente/'+data)

  }
  clientUpdate(data:cliente,id:any){
    console.log(data,"data en el servicio")
    return this.http.put<any>(environment.baseUrl+'/update/Cliente/'+id,data);
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
  deleteOnlyCliente(data:cliente){
    return this.http.post<any>(environment.baseUrl+'/delete/cliente',{data});
  }
  modificarEstadoVenta(estado:string,rut:string,idVenta:string){
    return this.http.post(environment.baseUrl+'/modificar/estado',{estado,rut,idVenta});
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
  comuna: string,
  ciudad: string,
  telefono: string,
  correo: string,
  rut: string,
  totalDeCompra?:number,

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


