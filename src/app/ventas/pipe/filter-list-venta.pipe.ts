import { Pipe, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
@Pipe({
  name: 'filterListVenta'
})
export class FilterListVentaPipe implements PipeTransform {

  transform(value: any[], args: string): any {
    var lista : any[] = [] ;
    var indicador = 0;  
    if(args==""){
      return value;
    }
    else{
      
      value.forEach((element: any) => {
        indicador = 0;
        var aux = element.cliente.nombre.toLowerCase().split('');
        var aux2 = args.toLowerCase().split('');
        
        for (let index = 0; index < aux2.length; index++) {
         
          if(aux[index] != aux2[index]){
            indicador = 1
          }
          
          
        }
        if(indicador==0){
          lista.push(element)
        }
        

      });
      if(lista.length == 0){
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Este dato no se encuentra',
          showConfirmButton: false,
          timer: 2000
        })
        return value;
      }
      return lista;
    } 
    
  }

}
