import { Component, OnInit } from '@angular/core';
import { FilterPendientesPipe } from '../../pipe/filter-pendientes.pipe';
import { PendientesService , pendiente} from '../../service/pendientes.service';
@Component({
  selector: 'app-list-pendientes',
  templateUrl: './list-pendientes.component.html',
  styleUrls: ['./list-pendientes.component.css']
})
export class ListPendientesComponent implements OnInit {

  filterListPendiente = 0
  estadoDeSearch = 1;
  indicadorMuestreo=0;//este sirve para mostrar el spiner
  array : pendiente[] = [];
  arrayAux: pendiente[] = [];
  // array = [1,2,3,4,5,6,7,8,9,10,11,12,13]
  constructor(private service: PendientesService, private filterPipe: FilterPendientesPipe) { }

  ngOnInit(): void {
    this.getPendientes()
    this.arrayAux = this.array
  }

  

  getPendientes(){
    this.service.getPendientes().subscribe(
      (res:any)=>{
        console.log(res.data)
        if(res.status == 200){
          res.data.forEach((element :pendiente) => {
            this.array.push(element)
          });
          if(this.array.length == res.data.length){
            this.indicadorMuestreo = 1
          }
        }
      }
    )
  }

  search(value:number){

    this.filterListPendiente = new Date(this.filterListPendiente).getTime();
    

    this.arrayAux = this.filterPipe.transform(this.array,this.filterListPendiente)
    
    if(this.estadoDeSearch==1){
      this.estadoDeSearch = value
      setTimeout(()=>{
        this.estadoDeSearch = 1
      },1)
    }
  }

}
