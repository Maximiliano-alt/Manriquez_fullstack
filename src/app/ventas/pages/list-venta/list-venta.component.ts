import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { VentasService,venta } from '../../services/ventas.service';
@Component({
  selector: 'app-list-venta',
  templateUrl: './list-venta.component.html',
  styleUrls: ['./list-venta.component.css']
})
export class ListVentaComponent implements OnInit {
  // estado="pagado";
 
  resto=0;
  array:venta[]=[]

  // inicio:any=0;


  
  // array = [1,2,3,4,5,6,7,8,9,10,11,12,13]
  // constructor() { }
  constructor(private servicio: VentasService,private router:Router){}

  ngOnInit(): void {
    this.resto = this.array.length%4
    this.getVentas()
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
  


}
