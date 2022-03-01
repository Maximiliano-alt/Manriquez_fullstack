import { Pipe, PipeTransform } from '@angular/core';
import { producto } from '../services/ventas.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:producto[],args:string): any {
    const resultPost: any[]=[];
    var indicador = 0;  
    if(args == ""){
      return value;
    }
    else{//hay filtro
      value.forEach((element: producto) => {
        indicador = 0;
        var aux = element.nombre.toLowerCase().split('');
        var aux2 = args.toLowerCase().split('');
        
        for (let index = 0; index < aux2.length; index++) {
         
          if(aux[index] != aux2[index]){
            indicador = 1
          }
          
          
        }
        if(indicador==0){
          resultPost.push(element)
        }

      });
      return resultPost;
    } 
  }

}
