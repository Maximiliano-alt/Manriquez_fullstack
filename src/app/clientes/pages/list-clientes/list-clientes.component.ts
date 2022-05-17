import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClienteService,cliente } from '../../service/cliente.service';
import { FilterListVentaPipe } from 'src/app/ventas/pipe/filter-list-venta.pipe';
import { FilterListClientesPipe } from '../../pipe/filter-list-clientes.pipe';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css']
})
export class ListClientesComponent implements OnInit {
  id:any
  estado="pagado";
  // array:any=[
  //   1,2,3,4,5,6,7,8,9,10,11,12,13,
  // ]
  filterListCliente = ""
  estadoDeSearch=1;
  arrayAux:cliente[]=[]
  array:cliente[]=[];

  constructor(private service:ClienteService, private router:Router,private filterCliente:FilterListClientesPipe) { }

  ngOnInit(): void {
    localStorage.removeItem('dataToken')
    this.getData()
    this.arrayAux = this.array
  }


  // este metodo trae los clientes del sistema
  getData(){
    this.service.getClientes().subscribe(
      (res:any)=>{
        if(res.status==200){
          res.clientes.forEach((e:cliente) => {
            this.array.push(e)
          });
        }
        if(res.clientes.length == 0){
          Swal.fire({
            title: '',
            text: 'No hay clientes ingresados en el sistema, ingresa uno en el boton +',
            icon: 'error',
          })
        }

      }
    )
  }

  search(value:number){
    this.arrayAux = this.filterCliente.transform(this.array,this.filterListCliente)

    if(this.estadoDeSearch==1){
      this.estadoDeSearch = value
      setTimeout(()=>{
        this.estadoDeSearch = 1
      },1)
    }
  }



}
