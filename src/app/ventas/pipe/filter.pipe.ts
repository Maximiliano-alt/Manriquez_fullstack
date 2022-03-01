import { Pipe, PipeTransform } from '@angular/core';
import { producto } from '../services/ventas.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:producto[],args:string): any {
    const resultPost: producto[]=[];
    if(args == ""){
      return value;
    }
    else{//hay filtro
      value.forEach((element: producto) => {
        if(element.categoria.toLowerCase() == args.toLowerCase()){
          resultPost.push(element)
        }
      });
      return resultPost;
    } 
  }

}
