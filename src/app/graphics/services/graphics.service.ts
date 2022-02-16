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
      delay(1000)
    )
  }

  getVentas(){
    return this.http.get<ventasGraphics>(environment.baseUrl+'/get/ventas/estadistica').pipe(
      delay(1000)
    )
  }






  
  goGraphicsRange(dateIn:Date,dateOut:Date,data:ventas[]){
    
    var dateAux1 = new Date(dateIn).getTime();
    var dateAux2 = new Date(dateOut).getTime();
    var diff = dateAux1 - dateAux2
    
    
    
    if(dateIn == undefined || dateOut ==undefined){
      return null
    }
    if(dateIn > dateOut){
      return null
    }
    if(dateOut>new Date(Date.now())){
      return null
    }
    if(diff/(1000*60*60*24) != -7 ){
      
      return null
    }
    else{
     
      var aux = this.dateForRange(dateIn,dateOut,data)
      return aux
    }
    
  }

  dateForRange(dateIn:Date,dateOut:Date,data:ventas[]){
    var dataLocal:ventas[] = []
    
    data.forEach((e)=>{
      
      if( new Date(dateIn).getTime() <= e.fecha && e.fecha <= new Date(dateOut).getTime()){

        dataLocal.push(e)
      }
      
    })
    return dataLocal;
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


export interface ventasGraphics{
  status:number,
  data:[
    ventas
  ]
   
}
export interface ventas{
  fecha:number,
  totalDeVenta:number
}

