import { Pipe, PipeTransform } from '@angular/core';
import { venta } from 'src/app/ventas/services/ventas.service';

@Pipe({
  name: 'filtroVenta'
})
export class FiltroVentaPipe implements PipeTransform {

  transform(value: venta[], args:any): any {
    const resultPost: venta[]=[];
    if(args == ""){
      return value;
    }
    else{//hay filtro
      value.forEach((element: venta) => {
        if(element.cliente.rut.toLowerCase() == args.toLowerCase()){
          resultPost.push(element)
        }
      });
      return resultPost;
    } 
  }

}
