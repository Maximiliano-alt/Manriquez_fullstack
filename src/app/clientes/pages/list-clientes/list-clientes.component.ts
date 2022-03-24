import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClienteService,cliente } from '../../service/cliente.service';

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

  array:cliente[]=[];

  constructor(private service:ClienteService, private router:Router) { }

  ngOnInit(): void {
    localStorage.removeItem('dataToken')
    this.getData()
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
            text: 'Aun no se ingresan clientes',
            icon: 'error',
          })
        }
        
      }
    )
  }
  
  
  

}
