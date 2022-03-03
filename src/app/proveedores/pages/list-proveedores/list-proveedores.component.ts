import { Component, OnInit } from '@angular/core';
import { Proveedor, ProveedorService } from '../../services/proveedor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-proveedores',
  templateUrl: './list-proveedores.component.html',
  styleUrls: ['./list-proveedores.component.css'],
})
export class ListProveedoresComponent implements OnInit {
  array:Proveedor[] = [];

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.getListProveedores();
    console.log(this.array);
  }

  getListProveedores():void{
    this.proveedorService.getAllProveedores().subscribe(res=>{
      if(res.length == 0){
        Swal.fire({
          title: '',
          text: 'No hay proveedores ingresados en el sistema, ingresa una en el boton +',
          icon: 'warning',
        })
      }else{
       
         console.log(res["proveedores"])
         this.array = res["proveedores"];

      }

    })
  }
}
