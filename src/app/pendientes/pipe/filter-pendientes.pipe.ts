import { Pipe, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

@Pipe({
  name: 'filterPendientes'
})
export class FilterPendientesPipe implements PipeTransform {

  transform(value: any[], args: number): any {
    var lista : any[] = [] ;
    var indicador = 0;  
    if(args==0){
      return value;
    }
    else{
      
      value.forEach((element: any) => {
       
        indicador = 0;
        var aux = new Date(element.fecha).getTime()
        var aux2 = args
        
        
        if(aux==aux2){
          console.log("aux:",aux,aux2)
          lista.push(element)
        }
        

      });
      if(lista.length == 0){
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'No hay pendientes para este dia!',
          showConfirmButton: false,
          timer: 2000
        })
        return value;
      }
      return lista;
    } 
    
    
  }


}
