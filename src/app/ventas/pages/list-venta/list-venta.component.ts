import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FilterListVentaPipe } from '../../pipe/filter-list-venta.pipe';
import { VentasService,venta } from '../../services/ventas.service';

@Component({
  selector: 'app-list-venta',
  templateUrl: './list-venta.component.html',
  styleUrls: ['./list-venta.component.css']
})

export class ListVentaComponent implements OnInit {
  // estado="pagado";
  estadoDeSearch=1;
  resto=0;
  array:venta[]=[]
  arrayAux:venta[]=[]
  // inicio:any=0;
  filterListVenta = ""

  
  // array = [1,2,3,4,5,6,7,8,9,10,11,12,13]
  // constructor() { }
  constructor(private servicio: VentasService,private router:Router,private filterVenta:FilterListVentaPipe){}

  ngOnInit(): void {
    this.resto = this.array.length%4
    this.getVentas()
    this.arrayAux = this.array
  }


  getVentas(){
    this.servicio.getVenta().subscribe(
      res=>{
        if(res.length == 0){
          Swal.fire({
            title: '',
            text: 'No hay ventas ingresadas en el sistema, ingresa una en el boton +',
            icon: 'warning',
          })

        }
        res.forEach((e)=>{
          this.array.push(e)
        })
      }
    )
  }  
  

  search(value:number){

    this.arrayAux = this.filterVenta.transform(this.array,this.filterListVenta)
    
    if(this.estadoDeSearch==1){
      this.estadoDeSearch = value
      setTimeout(()=>{
        this.estadoDeSearch = 1
      },1)
    }
  }

}
