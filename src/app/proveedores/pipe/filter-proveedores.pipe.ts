import { Pipe, PipeTransform } from '@angular/core';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Proveedor } from '../services/proveedor.service';
@Injectable({
  providedIn: 'root',
})
@Pipe({
  name: 'filterProveedores',
})
export class FilterProveedoresPipe implements PipeTransform {
  transform(value: any[], args: string): any {
    var lista: any[] = [];
    var indicador = 0;
    if (args == '') {
      return value;
    } else {
      indicador = 0;


      value.forEach((element: Proveedor) => {

        indicador = 0;
        console.log(element)
        var aux = element.nombre.toLowerCase();
        var aux2 = args.toLowerCase();
        for (let index = 0; index < aux2.length; index++) {
          if (aux[index] != aux2[index]) {
            indicador = 1;
          }
        }
        if (indicador == 0) {
          lista.push(element);
        }
      });


      return lista;
    }
  }
}
